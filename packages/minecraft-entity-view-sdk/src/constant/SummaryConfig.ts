import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobListEnum from '@dasred/minecraft-entity-view-sdk/constant/MobListEnum';
import SummaryConfigEntry from '@dasred/minecraft-entity-view-sdk/service/SummaryConfigEntry';

const SummaryConfig = [
    new SummaryConfigEntry({label: 'Active', command: CommandEnum.UPDATE_COUNT_ACTIVE, path: 'active'}),
    new SummaryConfigEntry({label: 'Total', command: CommandEnum.UPDATE_COUNT_TOTAL, path: 'total'}),

    new SummaryConfigEntry({label: 'Monster', command: CommandEnum[`UPDATE_COUNT_MOB_${MobListEnum.MONSTER}`], path: `mobCategory.${MobListEnum.MONSTER}`}),
    new SummaryConfigEntry({label: 'Creature', command: CommandEnum[`UPDATE_COUNT_MOB_${MobListEnum.CREATURE}`], path: `mobCategory.${MobListEnum.CREATURE}`}),
    new SummaryConfigEntry({label: 'Item', command: CommandEnum[`UPDATE_COUNT_MOB_${MobListEnum.ITEM}`], path: `mobCategory.${MobListEnum.ITEM}`}),
    new SummaryConfigEntry({label: 'Misc', command: CommandEnum[`UPDATE_COUNT_MOB_${MobListEnum.MISC}`], path: `mobCategory.${MobListEnum.MISC}`}),
    new SummaryConfigEntry({label: 'Other', command: CommandEnum[`UPDATE_COUNT_MOB_${MobListEnum.OTHER}`], path: `mobCategory.${MobListEnum.OTHER}`}),
];

export default SummaryConfig;