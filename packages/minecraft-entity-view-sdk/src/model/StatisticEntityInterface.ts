import EntityOrderTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityOrderTypeEnum';
import APIEntityInterface from './api/EntityInterface';

interface StatisticEntityInterface extends APIEntityInterface {
    stats: {
        firstSeen: number;
        order: Record<EntityOrderTypeEnum, number>;
        isMoved: boolean;
        isDeleted: boolean;
        isNew: boolean;
    };
}

export default StatisticEntityInterface;