import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import MobListEnum from '@dasred/minecraft-entity-view-sdk/constant/MobListEnum';

interface EntityBaseInterface {
    category: MobListEnum;
    chunkLoaded: boolean,
    customName?: string;
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