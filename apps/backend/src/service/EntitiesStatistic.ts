import MinecraftApiClient from '@/service/MinecraftApiClient';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import MobToMobCategory from '@dasred/minecraft-entity-view-sdk/constant/MobToMobCategory';
import EntityInterface from '@dasred/minecraft-entity-view-sdk/model/EntityInterface';
import PointInterface from '@dasred/minecraft-entity-view-sdk/model/PointInterface';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';

export default class EntitiesStatistic {
    private client: MinecraftApiClient;
    private statisticPrevious: StatisticsInterface;

    constructor(client: MinecraftApiClient) {
        this.client            = client;
        this.statisticPrevious = EntitiesStatistic.createNewStatistic();
    }

    public static createNewStatistic(entities?: EntityInterface[], statisticPrevious?: StatisticsInterface): StatisticsInterface {
        return {
            count: {
                total:   0,
                active:  0,
                added:   0,
                updated: 0,
                deleted: 0,

                mobCategory: Object.values(MobCategoryEnum).reduce((acc, mobCategory) => {
                    acc[mobCategory] = 0;
                    return acc;
                }, {} as { [key in MobCategoryEnum]: number }),

                history: {
                    total:       statisticPrevious ? [...statisticPrevious.count.history.total] : [],
                    active:      statisticPrevious ? [...statisticPrevious.count.history.active] : [],
                    added:       statisticPrevious ? [...statisticPrevious.count.history.added] : [],
                    updated:     statisticPrevious ? [...statisticPrevious.count.history.updated] : [],
                    deleted:     statisticPrevious ? [...statisticPrevious.count.history.deleted] : [],
                    mobCategory: Object.values(MobCategoryEnum).reduce((acc, mobCategory) => {
                        acc[mobCategory] = statisticPrevious ? [...statisticPrevious.count.history.mobCategory[mobCategory]] : [];
                        return acc;
                    }, {} as { [key in MobCategoryEnum]: PointInterface[] }),
                },
            },

            entities: (entities ?? []).reduce((acc, entity) => {
                acc[entity.uuid] = {
                    ...entity,
                    stats: {
                        updateCount:               1,
                        firstSeen:                 new Date(),
                        firstPosition:             {
                            x: entity.x,
                            y: entity.y,
                            z: entity.z,
                        },
                        previousPosition:          {
                            x: entity.x,
                            y: entity.y,
                            z: entity.z,
                        },
                        movedFromFirstPosition:    false,
                        movedFromPreviousPosition: false,
                    },
                } as StatisticEntityInterface;
                return acc;
            }, {} as { [key: string]: StatisticEntityInterface }),

            entitiesList: [],
        };
    }

    public async updateAndGetStatistic(): Promise<StatisticsInterface> {
        const entities  = await this.client.getEntities();
        const timestamp = new Date();
        if (entities === null) {
            return this.statisticPrevious;
        }

        const result = EntitiesStatistic.createNewStatistic(entities, this.statisticPrevious);

        result.count.total = entities.length;

        // collect deleted
        result.count.deleted = Object.keys(this.statisticPrevious.entities).reduce((acc, uuid) => acc + Number(result.entities[uuid] === undefined), 0);

        // collect update information
        Object.values(result.entities).forEach((entity) => {
            const entityPrevious = this.statisticPrevious.entities[entity.uuid];

            // update
            if (entityPrevious !== undefined) {
                result.count.updated++;
                entity.stats.updateCount               = entityPrevious.stats.updateCount + 1;
                entity.stats.firstSeen                 = entityPrevious.stats.firstSeen;
                entity.stats.previousPosition.x        = entityPrevious.x;
                entity.stats.previousPosition.y        = entityPrevious.y;
                entity.stats.previousPosition.z        = entityPrevious.z;
                entity.stats.movedFromFirstPosition    = entity.x !== entity.stats.firstPosition.x || entity.y !== entity.stats.firstPosition.y || entity.z !== entity.stats.firstPosition.z;
                entity.stats.movedFromPreviousPosition = entity.x !== entity.stats.previousPosition.x || entity.y !== entity.stats.previousPosition.y || entity.z !== entity.stats.previousPosition.z;
            }
            // add
            else {
                result.count.added++;
            }

            result.count.active += Number(entity.chunkLoaded);
            result.count.mobCategory[MobToMobCategory[entity.type]]++;
        });

        result.count.history.total.push({x: timestamp, y: result.count.total});
        result.count.history.active.push({x: timestamp, y: result.count.active});
        result.count.history.added.push({x: timestamp, y: result.count.added});
        result.count.history.updated.push({x: timestamp, y: result.count.updated});
        result.count.history.deleted.push({x: timestamp, y: result.count.deleted});

        Object.values(MobCategoryEnum).forEach((mobCategory) => result.count.history.mobCategory[mobCategory].push({x: timestamp, y: result.count.mobCategory[mobCategory]}));

        this.statisticPrevious = result;

        return result;
    }
}