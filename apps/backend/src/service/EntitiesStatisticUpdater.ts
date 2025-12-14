import config from '@/config';
import EntitiesStatisticUpdaterEventEnum from '@/service/entitiesStatisticUpdater/EventEnum';
import MinecraftApiClient from '@/service/MinecraftApiClient';
import collator from '@dasred/minecraft-entity-view-frontend/src/lib/collator';
import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
import MobListEnum from '@dasred/minecraft-entity-view-sdk/constant/MobListEnum';
import HistoryCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountInterface';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
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
    private timer: NodeJS.Timeout | undefined;

    constructor(client: MinecraftApiClient, interval: number) {
        super();
        this.client   = client;
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

                mobCategory: Object.values(MobListEnum).reduce((acc, mobCategory) => {
                    acc[mobCategory] = 0;
                    return acc;
                }, {} as Record<MobListEnum, number>),

                history: {
                    total:       [],
                    active:      [],
                    mobCategory: Object.values(MobListEnum).reduce((acc, mobCategory) => {
                        acc[mobCategory] = [];
                        return acc;
                    }, {} as Record<MobListEnum, HistoryCountInterface[]>),
                },
            },

            entity: Object.values(MobListEnum).reduce((acc, key) => {
                acc[key] = {};
                return acc;
            }, {} as StatisticMobListInterface),

            entityTypeCount: {},
        };
    }

    entityCompare(entityA: StatisticEntityInterface, entityB: StatisticEntityInterface): number {
        // deleted as last in list
        if (entityA.stats.removeTimestamp !== null && entityB.stats.removeTimestamp === null) {
            return 1;
        }
        else if (entityA.stats.removeTimestamp === null && entityB.stats.removeTimestamp !== null) {
            return -1;
        }
        else if (entityA.stats.removeTimestamp !== null && entityB.stats.removeTimestamp !== null) {
            return entityA.stats.removeTimestamp - entityB.stats.removeTimestamp;
        }

        // if it is items then more as first in list
        if (entityA.type === EntityTypeEnum.ITEM && entityB.type === EntityTypeEnum.ITEM && entityA.item.count !== entityB.item.count) {
            return entityB.item.count - entityA.item.count;
        }

        // older is first in list
        if (entityA.stats.firstSeenTimestamp !== entityB.stats.firstSeenTimestamp) {
            return entityA.stats.firstSeenTimestamp - entityB.stats.firstSeenTimestamp;
        }

        // sort by name
        const nameA = entityA.type === EntityTypeEnum.ITEM ? entityA.item.name : (entityA.customName ?? entityA.name);
        const nameB = entityB.type === EntityTypeEnum.ITEM ? entityB.item.name : (entityB.customName ?? entityB.name);
        if (nameA !== nameB) {
            return collator.compare(nameA, nameB);
        }

        // sort by position
        if (entityA.x !== entityB.x) {
            return entityA.x - entityB.x;
        }
        if (entityA.y !== entityB.y) {
            return entityA.y - entityB.y;
        }
        if (entityA.z !== entityB.z) {
            return entityA.z - entityB.z;
        }

        // final by id
        return collator.compare(entityA.uuid, entityB.uuid);
    }

    public getCurrentData(): StatisticsInterface {
        if (this.data === undefined) {
            throw new Error('EntitiesStatisticUpdater is not running.');
        }

        return this.data;
    }

    protected async run(): Promise<this> {
        this.clearTimer();

        const dataBefore = this.data;
        await this.updateAndGetStatistic();
        this.emit(EntitiesStatisticUpdaterEventEnum.UPDATE, this.data, dataBefore);

        this.timer = setTimeout(() => this.run(), this.interval);

        return this;
    }

    public async start(): Promise<this> {
        this.clearTimer();

        await this.updateAndGetStatistic();
        this.emit(EntitiesStatisticUpdaterEventEnum.STARTED, this.data);

        this.timer = setTimeout(() => this.run(), this.interval);

        return this;
    }

    public stop(): this {
        this.clearTimer();
        this.emit(EntitiesStatisticUpdaterEventEnum.STOPPED);

        return this;
    }

    protected async updateAndGetStatistic(): Promise<StatisticsInterface> {
        const entitiesBefore = this.entities;
        const entitiesAfter  = await this.client.getEntities();
        if (entitiesAfter === null) {
            return this.data;
        }

        //reAdd removed entities which remove timestamp is not older then
        const timestampNow = (new Date()).getTime();
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

        const result = EntitiesStatisticUpdater.createNewStatistic();

        // collect update information
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
                result.count.mobCategory[entityAfter.category]++;
            }

            result.entity[entityAfter.category][entityAfter.uuid] = entityAfter;
        });

        // define order value at lists
        Object.values(result.entity).forEach((entities) =>
            Object.values(entities).sort(this.entityCompare).forEach((entry, index) => entry.stats.order = index),
        );

        // update stats count
        result.count.total             = Object.values(entitiesAfter).filter((entity) => entity.stats.removeTimestamp === null).length;
        result.count.mobCategory.other = Object.values(result.entity.other).filter((entity) => entity.stats.removeTimestamp === null).length;

        // create type count list
        result.entityTypeCount = Object.values(entitiesAfter).reduce((acc, entity) => {
            if (entity.stats.removeTimestamp !== null) {
                return acc;
            }

            const type = entity.type === EntityTypeEnum.ITEM ? entity.item.type : entity.type;

            if (acc[type] === undefined) {
                acc[type] = {
                    type,
                    count: 0,
                    name:  entity.type === EntityTypeEnum.ITEM ? entity.item.name : entity.name,
                };
            }
            acc[type].count++;
            return acc;
        }, {} as StatisticTypeCountListInterface);

        this.data     = result;
        this.entities = entitiesAfter;

        return result;
    }
}