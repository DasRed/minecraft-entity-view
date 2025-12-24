import ChunkStatusEnum from '../../constant/ChunkStatusEnum';
import DimensionEnum from '../../constant/DimensionEnum';

interface Position {
    x: number;
    z: number;
}

interface APIChunkInterface {
    dimension: DimensionEnum;
    id: string;
    isLoaded: boolean;
    position: {
        min: Position;
        max: Position;
    };
    status: ChunkStatusEnum;
}

export default APIChunkInterface;