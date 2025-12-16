import collator from '@/lib/collator';
import EntitiesStatisticUpdaterEventEnum from '@/service/entitiesStatisticUpdater/EventEnum';
import EntitiesStatisticUpdaterSorter from '@/service/entitiesStatisticUpdater/Sorter';
import MinecraftApiClient from '@/service/MinecraftApiClient';
import Store from '@/service/Store';
import UpdaterConfigInterface from '@/service/UpdaterConfigInterface';
import EntityOrderTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityOrderTypeEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import HistoryCountEntryInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountEntryInterface';
import StatisticEntityListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityListInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import StatisticTypeCountListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticTypeCountListInterface';
import {cloneDeep} from 'lodash-es';
import EventEmitter from 'node:events';
import {clearTimeout} from 'node:timers';

export default class EntitiesStatisticUpdater extends EventEmitter {
    private client: MinecraftApiClient;
    private config: UpdaterConfigInterface;
    private sorter: EntitiesStatisticUpdaterSorter;
    private store: Store;
    private timer: NodeJS.Timeout | undefined;

    constructor(client: MinecraftApiClient, config: UpdaterConfigInterface, sorter: EntitiesStatisticUpdaterSorter, store: Store) {
        super();
        this.client = client;
        this.sorter = sorter;
        this.config = config;
        this.store  = store;
    }

    protected clearTimer(): this {
        if (this.timer !== undefined) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }

        return this;
    }

    handleHistory(prev: HistoryCountEntryInterface[], value: number): HistoryCountEntryInterface[] {
        const result = [...prev];
        if (prev.length === 0 || prev[prev.length - 1].y !== value) {
            result.push({x: this.store.getDateNow().toISOString(), y: value});
        }

        return result.slice(-1 * this.config.preserveHistoryDataLength);
    }

    protected async run(): Promise<this> {
        this.clearTimer();

        const dataBefore = this.store.getStatistic();
        await this.update();
        this.emit(EntitiesStatisticUpdaterEventEnum.UPDATE, this.store.getStatistic(), dataBefore);

        this.timer = setTimeout(() => this.run(), this.config.interval);

        return this;
    }

    public async start(): Promise<this> {
        this.clearTimer();

        await this.update();
        this.timer = setTimeout(() => this.run(), this.config.interval);

        return this;
    }

    protected async update(): Promise<this> {
        this.store.updateNow();
        const dataBefore     = this.store.getStatistic();
        const entitiesBefore = this.store.getEntities();
        const entitiesAfter  = await this.client.getEntities();
        if (entitiesAfter === null) {
            return this;
        }

        //reAdd removed entities which remove timestamp is not older then
        Object.values(entitiesBefore).forEach((entityBefore) => {
            const id = entityBefore.uuid;

            // entity still exists on server
            if (entitiesAfter[id] !== undefined) {
                return;
            }

            // entity is removed from server
            const entityInternalState = this.store.getEntityInternalState(entityBefore);
            entityInternalState.removeTimestamp ??= this.store.getTimestampNow();
            if ((this.store.getTimestampNow() - entityInternalState.removeTimestamp) >= this.config.deleteEntityAfter) {
                // final remove from infos
                this.store.removeEntityInternalState(id);
                return;
            }

            // still present until time runs out
            entitiesAfter[id]                 = cloneDeep(entityBefore);
            entitiesAfter[id].stats.isDeleted = true;
        });

        // collect update information
        const result = this.updateEntity(this.store.createNewStatistic(), entitiesAfter, entitiesBefore);

        // create type count list
        result.entityTypeCount = this.updateEntityTypeCount(entitiesAfter);

        // update history entries
        result.count.history.total  = this.handleHistory(dataBefore.count.history.total, result.count.total);
        result.count.history.active = this.handleHistory(dataBefore.count.history.active, result.count.active);
        Object.values(MobCategoryEnum).forEach((category) => result.count.history.mobCategory[category] = this.handleHistory(dataBefore.count.history.mobCategory[category], result.count.mobCategory[category]));

        this.store.setStatistic(result).setEntities(entitiesAfter);

        return this;
    }

    private updateEntity(result: StatisticsInterface, entitiesAfter: StatisticEntityListInterface, entitiesBefore: StatisticEntityListInterface): StatisticsInterface {
        Object.values(entitiesAfter).forEach((entityAfter) => {
            const entityBefore        = entitiesBefore[entityAfter.uuid];
            const entityInternalState = this.store.getEntityInternalState(entityBefore ?? entityAfter);

            entityAfter.stats.isNew                = this.store.getTimestampNow() < (entityInternalState.firstSeenTimestamp + this.config.isNewEntityFor);
            entityAfter.stats.isMoved              = entityAfter.x !== entityInternalState.previousPosition.x || entityAfter.y !== entityInternalState.previousPosition.y || entityAfter.z !== entityInternalState.previousPosition.z;
            entityInternalState.previousPosition.x = entityAfter.x;
            entityInternalState.previousPosition.y = entityAfter.y;
            entityInternalState.previousPosition.z = entityAfter.z;

            if (entityInternalState.removeTimestamp === null) {
                result.count.active += Number(entityAfter.chunkLoaded);
                result.count.total++;
                result.count.mobCategory[entityAfter.category]++;
            }

            result.entity[entityAfter.category][entityAfter.uuid] = entityAfter;
        });

        // define order value at lists
        this.sorter.sort(result.entity);

        return result;
    }

    private updateEntityTypeCount(entitiesAfter: StatisticEntityListInterface): StatisticTypeCountListInterface {
        const result = Object.values(entitiesAfter).reduce((acc, entityAfter) => {
            const entityInternalState = this.store.getEntityInternalState(entityAfter);
            if (entityInternalState.removeTimestamp !== null) {
                return acc;
            }

            const type = entityAfter.displayType;
            if (acc[type] === undefined) {
                acc[type] = {
                    type,
                    count: 0,
                    name:  entityAfter.displayName,
                    order: {count: 0, name: 0},
                };
            }

            acc[type].count++;
            return acc;
        }, {} as StatisticTypeCountListInterface);

        // do sort by count
        Object.values(result)
              .sort((entryA, entryB) => {
                  if (entryA.count === entryB.count) {
                      return collator.compare(entryA.name, entryB.name);
                  }

                  return entryA.count - entryB.count;
              })
              .forEach((entry, index) => entry.order.count = index);

        // do sort by name
        Object.values(result)
              .sort((entryA, entryB) => collator.compare(entryA.name, entryB.name))
              .forEach((entry, index) => entry.order.name = index);


        return result;
    }
}