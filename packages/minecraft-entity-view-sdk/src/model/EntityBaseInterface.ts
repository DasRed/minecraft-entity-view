import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';

interface EntityBaseInterface {
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