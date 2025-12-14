import MobListEnum from '@dasred/minecraft-entity-view-sdk/constant/MobListEnum';

const CommandEnum = {
    FULL_ENTITY_STATISTIC: 'full entity statistic',

    UPDATE_COUNT_ACTIVE:  'update count active',
    UPDATE_COUNT_TOTAL:   'update count total',

    [`UPDATE_COUNT_MOB_${MobListEnum.CREATURE}`]: `update count mob ${MobListEnum.CREATURE}`,
    [`UPDATE_COUNT_MOB_${MobListEnum.ITEM}`]:     `update count mob ${MobListEnum.ITEM}`,
    [`UPDATE_COUNT_MOB_${MobListEnum.MISC}`]:     `update count mob ${MobListEnum.MISC}`,
    [`UPDATE_COUNT_MOB_${MobListEnum.MONSTER}`]:  `update count mob ${MobListEnum.MONSTER}`,
    [`UPDATE_COUNT_MOB_${MobListEnum.OTHER}`]:    `update count mob ${MobListEnum.OTHER}`,

    UPDATE_ENTITY_TYPE_COUNT_ENTRIES_MODIFY:   'update entity type count entries modify',
    UPDATE_ENTITY_TYPE_COUNT_ENTRIES_PATCH_ID: (id: string): string => `update entity type count entries patch [${id}]`,

    UPDATE_ENTITY_MODIFY:   (key: MobListEnum) => `update entity modify [${key}]`,
    UPDATE_ENTITY_PATCH_ID: (key: MobListEnum, id: string): string => `update entity patch [${key}] [${id}]`,
} as const;

export default CommandEnum;
