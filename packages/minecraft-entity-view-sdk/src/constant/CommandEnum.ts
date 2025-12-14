import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import MobListEnum from '@dasred/minecraft-entity-view-sdk/constant/MobListEnum';

const CommandEnum = {
    FULL_ENTITY_STATISTIC: 'full entity statistic',

    UPDATE_COUNT_ACTIVE:  'update count active',
    UPDATE_COUNT_TOTAL:   'update count total',
    UPDATE_COUNT_ADDED:   'update count added',
    UPDATE_COUNT_UPDATED: 'update count updated',
    UPDATE_COUNT_DELETED: 'update count deleted',

    [`UPDATE_COUNT_MOB_${MobCategoryEnum.AMBIENT}`]:                    `update count mob ${MobCategoryEnum.AMBIENT}`,
    [`UPDATE_COUNT_MOB_${MobCategoryEnum.AXOLOTLS}`]:                   `update count mob ${MobCategoryEnum.AXOLOTLS}`,
    [`UPDATE_COUNT_MOB_${MobCategoryEnum.CREATURE}`]:                   `update count mob ${MobCategoryEnum.CREATURE}`,
    [`UPDATE_COUNT_MOB_${MobCategoryEnum.ITEM}`]:                       `update count mob ${MobCategoryEnum.ITEM}`,
    [`UPDATE_COUNT_MOB_${MobCategoryEnum.MISC}`]:                       `update count mob ${MobCategoryEnum.MISC}`,
    [`UPDATE_COUNT_MOB_${MobCategoryEnum.MONSTER}`]:                    `update count mob ${MobCategoryEnum.MONSTER}`,
    [`UPDATE_COUNT_MOB_${MobCategoryEnum.WATER_AMBIENT}`]:              `update count mob ${MobCategoryEnum.WATER_AMBIENT}`,
    [`UPDATE_COUNT_MOB_${MobCategoryEnum.WATER_CREATURE}`]:             `update count mob ${MobCategoryEnum.WATER_CREATURE}`,
    [`UPDATE_COUNT_MOB_${MobCategoryEnum.UNDERGROUND_WATER_CREATURE}`]: `update count mob ${MobCategoryEnum.UNDERGROUND_WATER_CREATURE}`,
    UPDATE_COUNT_MOB_OTHER:                                             `update count mob other`,

    UPDATE_ENTITY_TYPE_COUNT_ENTRIES_MODIFY: 'update entity type count entries modify',
    UPDATE_ENTITY_TYPE_COUNT_ENTRIES_PATCH_ID: (id: string): string => `update entity type count entries patch [${id}]`,

    UPDATE_ENTITY_MODIFY: (key: MobListEnum) => `update entity modify [${key}]`,
    UPDATE_ENTITY_PATCH_ID: (key: MobListEnum, id: string): string => `update entity patch [${key}] [${id}]`,
} as const;

export default CommandEnum;
