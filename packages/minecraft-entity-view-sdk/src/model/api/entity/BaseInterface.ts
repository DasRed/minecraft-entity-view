import DimensionEnum from '../../../constant/DimensionEnum';
import MobCategoryEnum from '../../../constant/MobCategoryEnum';
import APIChunkInterface from '../ChunkInterface';

interface APIEntityBaseInterface {
    born: {
        at: {
            timestamp: number;
            gameTime: number;
        }
    };
    category: MobCategoryEnum;
    chunk: APIChunkInterface;
    customName?: string;
    dimension: DimensionEnum;
    displayName: string;
    displayType: string;
    name: string;
    tags: string[];
    uuid: string;
    x: number;
    y: number;
    z: number;
}

export default APIEntityBaseInterface;