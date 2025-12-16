import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import HistoryCountEntryInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountEntryInterface';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import StatisticEntityInternalStateInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInternalStateInterface';
import StatisticEntityInternalStateListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInternalStateListInterface';
import StatisticEntityListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityListInterface';
import StatisticMobListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticMobListInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';

export default class Store {
    private dateNow: Date;
    private entities: StatisticEntityListInterface;
    private entitiesInternalState: StatisticEntityInternalStateListInterface;
    private statistic: StatisticsInterface;
    private timestampNow: number;

    constructor() {
        this.statistic             = this.createNewStatistic();
        this.entities              = {};
        this.entitiesInternalState = {};
        this.dateNow               = new Date();
        this.timestampNow          = this.dateNow.getTime();
    }

    public createNewStatistic(): StatisticsInterface {
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

    public getDateNow(): Date {
        return this.dateNow;
    }

    public getEntities(): StatisticEntityListInterface {
        return this.entities;
    }

    public getEntityInternalState(entity: StatisticEntityInterface): StatisticEntityInternalStateInterface {
        if (this.entitiesInternalState[entity.uuid] === undefined) {
            this.entitiesInternalState[entity.uuid] = {
                firstPosition:      {x: entity.x, y: entity.y, z: entity.z},
                firstSeenTimestamp: this.timestampNow,
                previousPosition:   {x: entity.x, y: entity.y, z: entity.z},
                removeTimestamp:    null,
            };
        }

        return this.entitiesInternalState[entity.uuid];
    }

    public getStatistic(): StatisticsInterface {
        return this.statistic;
    }

    public getTimestampNow(): number {
        return this.timestampNow;
    }

    public removeEntityInternalState(id: string): this {
        delete this.entitiesInternalState[id];
        return this;
    }

    public setEntities(entities: StatisticEntityListInterface): this {
        this.entities = entities;
        return this;
    }

    public setStatistic(statistic: StatisticsInterface): this {
        this.statistic = statistic;
        return this;
    }

    public updateNow(): this {
        this.dateNow      = new Date();
        this.timestampNow = this.dateNow.getTime();

        return this;
    }
}