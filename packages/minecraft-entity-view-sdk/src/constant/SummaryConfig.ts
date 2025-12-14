import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import SummaryConfigEntry from '@dasred/minecraft-entity-view-sdk/service/SummaryConfigEntry';

const SummaryConfig = [
    new SummaryConfigEntry({label: 'Active', command: CommandEnum.UPDATE_COUNT_ACTIVE, path: 'active'}),
    new SummaryConfigEntry({label: 'Total', command: CommandEnum.UPDATE_COUNT_TOTAL, path: 'total'}),

    new SummaryConfigEntry({label: 'Ambient', command: CommandEnum[`UPDATE_COUNT_MOB_${MobCategoryEnum.AMBIENT}`], path: `mobCategory.${MobCategoryEnum.AMBIENT}`}),
    new SummaryConfigEntry({label: 'Axolotls', command: CommandEnum[`UPDATE_COUNT_MOB_${MobCategoryEnum.AXOLOTLS}`], path: `mobCategory.${MobCategoryEnum.AXOLOTLS}`}),
    new SummaryConfigEntry({visible: false, label: 'Creature', command: CommandEnum[`UPDATE_COUNT_MOB_${MobCategoryEnum.CREATURE}`], path: `mobCategory.${MobCategoryEnum.CREATURE}`}),
    new SummaryConfigEntry({visible: false, label: 'Item', command: CommandEnum[`UPDATE_COUNT_MOB_${MobCategoryEnum.ITEM}`], path: `mobCategory.${MobCategoryEnum.ITEM}`}),
    new SummaryConfigEntry({visible: false, label: 'Misc', command: CommandEnum[`UPDATE_COUNT_MOB_${MobCategoryEnum.MISC}`], path: `mobCategory.${MobCategoryEnum.MISC}`}),
    new SummaryConfigEntry({visible: false, label: 'Monster', command: CommandEnum[`UPDATE_COUNT_MOB_${MobCategoryEnum.MONSTER}`], path: `mobCategory.${MobCategoryEnum.MONSTER}`}),
    new SummaryConfigEntry({label: 'Water Ambient', command: CommandEnum[`UPDATE_COUNT_MOB_${MobCategoryEnum.WATER_AMBIENT}`], path: `mobCategory.${MobCategoryEnum.WATER_AMBIENT}`}),
    new SummaryConfigEntry({label: 'Water Creature', command: CommandEnum[`UPDATE_COUNT_MOB_${MobCategoryEnum.WATER_CREATURE}`], path: `mobCategory.${MobCategoryEnum.WATER_CREATURE}`}),
    new SummaryConfigEntry({label: 'Underground Water Creature', command: CommandEnum[`UPDATE_COUNT_MOB_${MobCategoryEnum.UNDERGROUND_WATER_CREATURE}`], path: `mobCategory.${MobCategoryEnum.UNDERGROUND_WATER_CREATURE}`}),
    new SummaryConfigEntry({visible: false, label: 'Other', command: CommandEnum.UPDATE_COUNT_MOB_OTHER, path: 'mobCategory.other'}),
];

export default SummaryConfig;