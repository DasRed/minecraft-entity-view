import ChunkStatusEnum from '@dasred/minecraft-entity-view-sdk/constant/ChunkStatusEnum';
import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';

enum EntityFilterTypeEnum {
    CHUNK_STATUS_INACCESSIBLE   = ChunkStatusEnum.INACCESSIBLE,
    CHUNK_STATUS_FULL           = ChunkStatusEnum.FULL,
    CHUNK_STATUS_BLOCK_TICKING  = ChunkStatusEnum.BLOCK_TICKING,
    CHUNK_STATUS_ENTITY_TICKING = ChunkStatusEnum.ENTITY_TICKING,

    ENTITY_IS_DELETED           = 'ENTITY_IS_DELETED',

    DIMENSION_OVERWORLD         = DimensionEnum.OVERWORLD,
    DIMENSION_NETHER            = DimensionEnum.NETHER,
    DIMENSION_END               = DimensionEnum.END,
}

export default EntityFilterTypeEnum;