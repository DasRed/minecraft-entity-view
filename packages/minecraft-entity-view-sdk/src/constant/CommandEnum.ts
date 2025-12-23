import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';

const CommandEnum = {
    DIMENSIONS_FULL: '[DIMENSIONS] full',

    PLAYERS_FULL:       '[PLAYERS] full',
    PLAYERS_PATCH_LIST: '[PLAYERS] patch list',
    PLAYERS_PATCH_ID:   (id: string): string => `[PLAYERS] patch id ${id}`,

    STATISTIC_FULL: '[STATISTIC] full',

    STATISTIC_UPDATE_COUNT_TOTAL:       '[STATISTIC] update count total',
    STATISTIC_UPDATE_COUNT_MOB:         (category: MobCategoryEnum) => `[STATISTIC] update count mob ${category}`,
    STATISTIC_UPDATE_COUNT_HISTORY_MOB: '[STATISTIC] update count history mob',

    STATISTIC_PATCH_TYPE_COUNT_LIST: '[STATISTIC] patch type count list',
    STATISTIC_PATCH_TYPE_COUNT_ID:   (id: string): string => `[STATISTIC] patch type count entry [${id}]`,

    STATISTIC_PATCH_ENTITIES_LIST: (category: MobCategoryEnum) => `[STATISTIC] modify entities list [${category}]`,
    STATISTIC_PATCH_ENTITIES_ID:   (id: string): string => `[STATISTIC] patch entities entry [${id}]`,

    KILL_ENTITY:          'kill entity',
    KILL_ENTITY_RESPONSE: (id: string): string => `kill entity response ${id}`,
} as const;

export default CommandEnum;
