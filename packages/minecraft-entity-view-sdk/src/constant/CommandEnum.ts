import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';

const CommandEnum = {
    FULL_STATISTIC: 'full statistic',

    UPDATE_COUNT_ACTIVE: 'update count active',
    UPDATE_COUNT_TOTAL:  'update count total',
    UPDATE_COUNT_MOB:    (category: MobCategoryEnum) => `update count mob ${category}`,

    PATCH_COUNT_HISTORY_ACTIVE: 'patch count history active',
    PATCH_COUNT_HISTORY_TOTAL:  'patch count history total',
    PATCH_COUNT_HISTORY_MOB:    (category: MobCategoryEnum) => `patch count history mob ${category}`,

    PATCH_TYPE_COUNT_LIST: 'patch type count list',
    PATCH_TYPE_COUNT_ID:   (id: string): string => `patch type count entry [${id}]`,

    PATCH_ENTITIES_LIST: (category: MobCategoryEnum) => `modify entities list [${category}]`,
    PATCH_ENTITIES_ID:   (category: MobCategoryEnum, id: string): string => `patch entities entry [${category}] [${id}]`,

} as const;

export default CommandEnum;
