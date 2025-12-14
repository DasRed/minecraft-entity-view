import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import SummaryConfigEntry from '@dasred/minecraft-entity-view-sdk/service/SummaryConfigEntry';

const SummaryConfig = [
    new SummaryConfigEntry({label: 'Active', commandValue: CommandEnum.UPDATE_COUNT_ACTIVE, commandHistory: CommandEnum.PATCH_COUNT_HISTORY_ACTIVE, path: 'active'}),
    new SummaryConfigEntry({label: 'Total', commandValue: CommandEnum.UPDATE_COUNT_TOTAL, commandHistory: CommandEnum.PATCH_COUNT_HISTORY_TOTAL, path: 'total'}),

    new SummaryConfigEntry({label: 'Monster', commandValue: CommandEnum.UPDATE_COUNT_MOB(MobCategoryEnum.MONSTER), commandHistory: CommandEnum.PATCH_COUNT_HISTORY_MOB(MobCategoryEnum.MONSTER), path: `mobCategory.${MobCategoryEnum.MONSTER}`}),
    new SummaryConfigEntry({label: 'Creature', commandValue: CommandEnum.UPDATE_COUNT_MOB(MobCategoryEnum.CREATURE), commandHistory: CommandEnum.PATCH_COUNT_HISTORY_MOB(MobCategoryEnum.CREATURE), path: `mobCategory.${MobCategoryEnum.CREATURE}`}),
    new SummaryConfigEntry({label: 'Item', commandValue: CommandEnum.UPDATE_COUNT_MOB(MobCategoryEnum.ITEM), commandHistory: CommandEnum.PATCH_COUNT_HISTORY_MOB(MobCategoryEnum.ITEM), path: `mobCategory.${MobCategoryEnum.ITEM}`}),
    new SummaryConfigEntry({label: 'Misc', commandValue: CommandEnum.UPDATE_COUNT_MOB(MobCategoryEnum.MISC), commandHistory: CommandEnum.PATCH_COUNT_HISTORY_MOB(MobCategoryEnum.MISC), path: `mobCategory.${MobCategoryEnum.MISC}`}),
    new SummaryConfigEntry({label: 'Other', commandValue: CommandEnum.UPDATE_COUNT_MOB(MobCategoryEnum.OTHER), commandHistory: CommandEnum.PATCH_COUNT_HISTORY_MOB(MobCategoryEnum.OTHER), path: `mobCategory.${MobCategoryEnum.OTHER}`}),
];

export default SummaryConfig;