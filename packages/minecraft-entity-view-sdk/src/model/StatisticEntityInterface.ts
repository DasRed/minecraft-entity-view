import EntityOrderTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityOrderTypeEnum';
import EntityInterface from '@dasred/minecraft-entity-view-sdk/model/EntityInterface';

interface StatisticEntityInterface extends EntityInterface {
    stats: {
        order: Record<EntityOrderTypeEnum, number>;
        isMoved: boolean;
        isDeleted: boolean;
        isNew: boolean;
    };
}

export default StatisticEntityInterface;