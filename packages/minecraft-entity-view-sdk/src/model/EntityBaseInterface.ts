import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';

interface EntityBaseInterface {
    chunkLoaded: boolean,
    customName?: string;
    category: MobCategoryEnum;
    dimension: DimensionEnum;
    name: string;
    onGround: boolean;
    tags: string[];
    uuid: string;
    x: number;
    y: number;
    z: number;
}


export default EntityBaseInterface;