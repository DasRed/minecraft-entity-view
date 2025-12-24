/**
 | Status          | Blöcke | Block-Ticks | Entity-Ticks | Typisch für        |
 | INACCESSIBLE    |  ❌    |    ❌       |     ❌       |  Unloaded         |
 | FULL            |  ✅    |    ❌       |     ❌       |  View-Dist Rand   |
 | BLOCK_TICKING   |  ✅    |    ✅       |     ❌       |  Redstone-Bereich |
 | ENTITY_TICKING  |  ✅    |    ✅       |     ✅       |  Spieler-Nähe     |
 */

enum ChunkStatusEnum {
    UNKNOWN        = 'UNKNOWN',
    INACCESSIBLE   = 'INACCESSIBLE',
    FULL           = 'FULL',
    BLOCK_TICKING  = 'BLOCK_TICKING',
    ENTITY_TICKING = 'ENTITY_TICKING',
}

export default ChunkStatusEnum;

