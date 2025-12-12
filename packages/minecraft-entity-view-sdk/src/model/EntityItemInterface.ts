import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
import EntityBaseInterface from '@dasred/minecraft-entity-view-sdk/model/EntityBaseInterface';

interface EntityItemInterface extends EntityBaseInterface {
    item: {
        name: string;
        type: string;
        age: number;
        lifespan: number;
        count: number;
        popTime: number;
    };
    type: EntityTypeEnum.ITEM;
}

export default EntityItemInterface;