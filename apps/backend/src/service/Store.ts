import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import APIPlayersInterface from '@dasred/minecraft-entity-view-sdk/model/api/PlayersInterface';
import HistoryCountMobCategoryInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountMobCategoryInterface';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import StatisticEntityInternalStateInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInternalStateInterface';
import StatisticEntityInternalStateListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInternalStateListInterface';
import StatisticEntityListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityListInterface';
import StatisticMobListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticMobListInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';

export default class Store {
    protected dateNow: Date;
    protected dimensions: APIDimensionInterface[]                              = [];
    protected entities: StatisticEntityListInterface                           = {};
    protected entitiesInternalState: StatisticEntityInternalStateListInterface = {};
    protected players: APIPlayersInterface                                     = {max: 0, players: {}};
    protected statistic: StatisticsInterface;
    protected timestampNow: number;

    constructor() {
        this.statistic    = this.createNewStatistic();
        this.dateNow      = new Date();
        this.timestampNow = this.dateNow.getTime();
    }

    public createNewStatistic(): StatisticsInterface {
        return {
            count: {
                total: 0,

                mobCategory: Object.values(MobCategoryEnum).reduce((acc, mobCategory) => {
                    acc[mobCategory] = 0;
                    return acc;
                }, {} as Record<MobCategoryEnum, number>),

                history: {
                    mobCategory: Object.values(MobCategoryEnum).reduce((acc, mobCategory) => {
                        acc[mobCategory] = [];
                        return acc;
                    }, {timestamp: []} as unknown as HistoryCountMobCategoryInterface),
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

    public getDimensions(): APIDimensionInterface[] {
        return this.dimensions;
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

    public getPlayers(): APIPlayersInterface {
        return this.players;
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

    public setDimensions(dimensions: APIDimensionInterface[]): this {
        this.dimensions = dimensions;

        return this;
    }

    public setEntities(entities: StatisticEntityListInterface): this {
        this.entities = entities;
        return this;
    }

    public setPlayers(players: APIPlayersInterface): this {
        this.players = players;

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