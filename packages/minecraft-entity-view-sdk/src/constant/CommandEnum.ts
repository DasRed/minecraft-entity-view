import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';

const CommandEnum = {
    FULL_STATISTIC: 'full statistic',

    UPDATE_COUNT_TOTAL:       'update count total',
    UPDATE_COUNT_MOB:         (category: MobCategoryEnum) => `update count mob ${category}`,
    UPDATE_COUNT_HISTORY_MOB: 'update count history mob',

    PATCH_TYPE_COUNT_LIST: 'patch type count list',
    PATCH_TYPE_COUNT_ID:   (id: string): string => `patch type count entry [${id}]`,

    PATCH_ENTITIES_LIST: (category: MobCategoryEnum) => `modify entities list [${category}]`,
    PATCH_ENTITIES_ID:   (id: string): string => `patch entities entry [${id}]`,

} as const;

export default CommandEnum;
