import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import PointInterface from '@dasred/minecraft-entity-view-sdk/model/PointInterface';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';

interface StatisticsInterface {
    count: {
        total: number;
        active: number;
        added: number;
        updated: number;
        deleted: number;
        mobCategory: { [key in MobCategoryEnum]: number };

        history: {
            total: PointInterface[];
            active: PointInterface[];
            added: PointInterface[];
            updated: PointInterface[];
            deleted: PointInterface[];
            mobCategory: { [key in MobCategoryEnum]: PointInterface[] };
        };
    };

    entities: { [key: string]: StatisticEntityInterface };
    entitiesList: StatisticEntityInterface[];

}

export default StatisticsInterface;