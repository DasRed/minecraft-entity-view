import collator from '@/lib/collator';
import EntitiesStatisticUpdaterConfigInterface from '@/service/entitiesStatistic/ConfigInterface';
import EntitiesStatisticUpdaterEventEnum from '@/service/entitiesStatistic/EventEnum';
import EntitiesStatisticUpdaterSorter from '@/service/entitiesStatistic/Sorter';
import MinecraftApiClient from '@/service/MinecraftApiClient';
import Store from '@/service/Store';
import UpdaterIntervalAbstract from '@/service/updater/IntervalAbstract';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import StatisticCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/CountInterface';
import HistoryCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountInterface';
import StatisticEntityListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityListInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import StatisticTypeCountListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticTypeCountListInterface';
import {cloneDeep} from 'lodash-es';

export default class EntitiesStatisticUpdater extends UpdaterIntervalAbstract {
    private config: EntitiesStatisticUpdaterConfigInterface;
    private sorter: EntitiesStatisticUpdaterSorter;

    constructor(client: MinecraftApiClient, store: Store, config: EntitiesStatisticUpdaterConfigInterface, sorter: EntitiesStatisticUpdaterSorter) {
        super(client, store, config.interval);
        this.sorter = sorter;
        this.config = config;
    }

    public getCommandOnClientConnect(): CommandType {
        return CommandEnum.STATISTIC_FULL;
    }

    public getCurrentData(): unknown {
        return this.store.getStatistic();
    }

    public getEventOnUpdate(): string {
        return EntitiesStatisticUpdaterEventEnum.UPDATE;
    }

    handleHistory(historyAfter: HistoryCountInterface, historyBefore: HistoryCountInterface, count: StatisticCountInterface): HistoryCountInterface {
        const timestampLast = historyBefore.mobCategory.timestamp.length !== 0 ? historyBefore.mobCategory.timestamp[historyBefore.mobCategory.timestamp.length - 1] * 1000 : 0;
        if (this.store.getTimestampNow() < timestampLast + this.config.historyDeltaBetweenPoints) {
            return historyBefore;
        }

        historyAfter.mobCategory.timestamp = [...historyBefore.mobCategory.timestamp, this.store.getTimestampNow() / 1000].slice(-1 * this.config.preserveHistoryDataLength);
        Object.values(MobCategoryEnum).forEach((category) => {
            historyAfter.mobCategory[category] = [...historyBefore.mobCategory[category], count.mobCategory[category]].slice(-1 * this.config.preserveHistoryDataLength);
        });

        return historyAfter;
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
        const dataAfter = this.updateEntity(this.store.createNewStatistic(), entitiesAfter, entitiesBefore);

        // create type count list
        dataAfter.entityTypeCount = this.updateEntityTypeCount(entitiesAfter, dataBefore.entityTypeCount);
        dataAfter.count.history   = this.handleHistory(dataAfter.count.history, dataBefore.count.history, dataAfter.count);

        this.store.setStatistic(dataAfter).setEntities(entitiesAfter);

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
                result.count.total++;
                result.count.mobCategory[entityAfter.category]++;
            }

            result.entity[entityAfter.category][entityAfter.uuid] = entityAfter;
        });

        // define order value at lists
        this.sorter.sort(result.entity);

        return result;
    }

    private updateEntityTypeCount(entitiesAfter: StatisticEntityListInterface, resultBefore: StatisticTypeCountListInterface): StatisticTypeCountListInterface {
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
            },
            Object.fromEntries(
                Object.entries(resultBefore)
                      .map(
                          ([key, value]) => ([key, {...value, count: 0}]),
                      ),
            ),
        );

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