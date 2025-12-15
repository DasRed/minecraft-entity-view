import config from '@/config';
import collator from '@/lib/collator';
import EntitiesStatisticUpdaterEventEnum from '@/service/entitiesStatisticUpdater/EventEnum';
import EntitiesStatisticUpdaterSorter from '@/service/entitiesStatisticUpdater/Sorter';
import MinecraftApiClient from '@/service/MinecraftApiClient';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import HistoryCountEntryInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountEntryInterface';
import StatisticEntityListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityListInterface';
import StatisticMobListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticMobListInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import StatisticTypeCountListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticTypeCountListInterface';
import {cloneDeep} from 'lodash-es';
import EventEmitter from 'node:events';
import {clearTimeout} from 'node:timers';

export default class EntitiesStatisticUpdater extends EventEmitter {
    private client: MinecraftApiClient;
    private data: StatisticsInterface;
    private entities: StatisticEntityListInterface;
    private interval: number;
    private sorter: EntitiesStatisticUpdaterSorter;
    private timer: NodeJS.Timeout | undefined;

    constructor(client: MinecraftApiClient, interval: number, sorter: EntitiesStatisticUpdaterSorter) {
        super();
        this.client   = client;
        this.sorter   = sorter;
        this.data     = EntitiesStatisticUpdater.createNewStatistic();
        this.entities = {};
        this.interval = interval;
    }

    protected clearTimer(): this {
        if (this.timer !== undefined) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }

        return this;
    }

    protected static createNewStatistic(): StatisticsInterface {
        return {
            count: {
                total:  0,
                active: 0,

                mobCategory: Object.values(MobCategoryEnum).reduce((acc, mobCategory) => {
                    acc[mobCategory] = 0;
                    return acc;
                }, {} as Record<MobCategoryEnum, number>),

                history: {
                    total:       [],
                    active:      [],
                    mobCategory: Object.values(MobCategoryEnum).reduce((acc, mobCategory) => {
                        acc[mobCategory] = [];
                        return acc;
                    }, {} as Record<MobCategoryEnum, HistoryCountEntryInterface[]>),
                },
            },

            entity: Object.values(MobCategoryEnum).reduce((acc, key) => {
                acc[key] = {};
                return acc;
            }, {} as StatisticMobListInterface),

            entityTypeCount: {},
        };
    }

    public getCurrentData(): StatisticsInterface {
        if (this.data === undefined) {
            throw new Error('EntitiesStatisticUpdater is not running.');
        }

        return this.data;
    }

    handleHistory(prev: HistoryCountEntryInterface[], dateNow: Date, value: number): HistoryCountEntryInterface[] {
        const result = [...prev];
        if (prev.length === 0 || prev[prev.length - 1].y !== value) {
            result.push({x: dateNow.toISOString(), y: value});
        }

        return result.slice(-1 * config.entitiesStatisticUpdater.preserveHistoryDataLength);
    }

    protected async run(): Promise<this> {
        this.clearTimer();

        const dataBefore = this.data;
        await this.update();
        this.emit(EntitiesStatisticUpdaterEventEnum.UPDATE, this.data, dataBefore);

        this.timer = setTimeout(() => this.run(), this.interval);

        return this;
    }

    public async start(): Promise<this> {
        this.clearTimer();

        await this.update();
        this.emit(EntitiesStatisticUpdaterEventEnum.STARTED, this.data);

        this.timer = setTimeout(() => this.run(), this.interval);

        return this;
    }

    protected async update(): Promise<this> {
        const dateNow        = new Date();
        const timestampNow   = dateNow.getTime();
        const dataBefore     = this.data;
        const entitiesBefore = this.entities;
        const entitiesAfter  = await this.client.getEntities();
        if (entitiesAfter === null) {
            return this;
        }

        //reAdd removed entities which remove timestamp is not older then
        Object.values(entitiesBefore).forEach((entityBefore) => {
            const id = entityBefore.uuid;
            if (entitiesAfter[id] !== undefined) {
                return;
            }

            const timestamp = entityBefore.stats.removeTimestamp ?? timestampNow;
            if ((timestampNow - timestamp) >= config.entitiesStatisticUpdater.removeEntityAfter) {
                return;
            }

            entitiesAfter[id]                       = cloneDeep(entityBefore);
            entitiesAfter[id].stats.removeTimestamp = timestamp;
        });

        // collect update information
        const result = this.updateEntity(EntitiesStatisticUpdater.createNewStatistic(), entitiesAfter, entitiesBefore);

        // create type count list
        result.entityTypeCount = this.updateEntityTypeCount(entitiesAfter);

        // update history entries
        result.count.history.total  = this.handleHistory(dataBefore.count.history.total, dateNow, result.count.total);
        result.count.history.active = this.handleHistory(dataBefore.count.history.active, dateNow, result.count.active);
        Object.values(MobCategoryEnum).forEach((category) => result.count.history.mobCategory[category] = this.handleHistory(dataBefore.count.history.mobCategory[category], dateNow, result.count.mobCategory[category]));

        this.data     = result;
        this.entities = entitiesAfter;

        return this;
    }

    private updateEntity(result: StatisticsInterface, entitiesAfter: StatisticEntityListInterface, entitiesBefore: StatisticEntityListInterface): StatisticsInterface {
        Object.values(entitiesAfter).forEach((entityAfter) => {
            const entityPrevious = entitiesBefore[entityAfter.uuid];

            // update
            if (entityPrevious !== undefined) {
                entityAfter.stats.firstSeenTimestamp = entityPrevious.stats.firstSeenTimestamp;
                entityAfter.stats.firstPosition      = entityPrevious.stats.firstPosition;
                entityAfter.stats.previousPosition.x = entityPrevious.x;
                entityAfter.stats.previousPosition.y = entityPrevious.y;
                entityAfter.stats.previousPosition.z = entityPrevious.z;
                entityAfter.stats.moved              = entityAfter.x !== entityAfter.stats.previousPosition.x || entityAfter.y !== entityAfter.stats.previousPosition.y || entityAfter.z !== entityAfter.stats.previousPosition.z;
            }

            if (entityAfter.stats.removeTimestamp === null) {
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
        const result = Object.values(entitiesAfter).reduce((acc, entity) => {
            if (entity.stats.removeTimestamp !== null) {
                return acc;
            }

            const type = entity.displayType;

            if (acc[type] === undefined) {
                acc[type] = {
                    type,
                    count: 0,
                    name:  entity.displayName,
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