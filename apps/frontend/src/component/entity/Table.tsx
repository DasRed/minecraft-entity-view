import EntityEntry from '@/component/entity/Entry';
import EntitySummaryValue from '@/component/EntitySummaryValue';
import WSSubscribe from '@/component/WSSubscribe';
import useWSSListModify from '@/hook/useWSSListModify';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import MobListEnum from '@dasred/minecraft-entity-view-sdk/constant/MobListEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import StatisticEntityListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityListInterface';
import {set} from 'lodash-es';
import {ReactElement} from 'react';

interface EntitiesTableOptionsInterface {
    entities: StatisticEntityListInterface;
    category?: MobCategoryEnum;
    listKey: MobListEnum;
    title?: string;
    command?: string;
}

const MobCategoryTitle: Record<string, string> = {
    [MobCategoryEnum.AMBIENT]:                    'Ambient',
    [MobCategoryEnum.AXOLOTLS]:                   'Axolotls',
    [MobCategoryEnum.CREATURE]:                   'Creature',
    [MobCategoryEnum.ITEM]:                       'Item',
    [MobCategoryEnum.MISC]:                       'Misc',
    [MobCategoryEnum.MONSTER]:                    'Monster',
    [MobCategoryEnum.WATER_AMBIENT]:              'Water Ambient',
    [MobCategoryEnum.WATER_CREATURE]:             'Water Creature',
    [MobCategoryEnum.UNDERGROUND_WATER_CREATURE]: 'Underground Water Creature',
};

export default function EntityTable({entities: entitiesInitial, category, listKey, title = 'unknown', command}: EntitiesTableOptionsInterface): ReactElement {
    const {entities} = useWSSListModify<StatisticEntityInterface>(entitiesInitial, CommandEnum.UPDATE_ENTITY_MODIFY(listKey));

    command ??= category ? CommandEnum[`UPDATE_COUNT_MOB_${category}`] : command;

    return (
        <div>
            <h2 className="font-extrabold text-xl">
                <span>{(category ? MobCategoryTitle[category] : undefined) ?? title}</span>
                <span className="text-sm font-normal pl-1">
                    (<EntitySummaryValue command={command} initial={Object.values(entities).length}></EntitySummaryValue>)
                </span>
            </h2>
            <div className="flex flex-col-reverse text-sm">
                <div className="w-full font-bold border-b border-default order-last grid grid-cols-7">
                    <span className="col-span-3 overflow-hidden text-ellipsis">Name</span>
                    <span className="overflow-hidden text-ellipsis">Dimension</span>
                    <span className="text-right overflow-hidden text-ellipsis">X</span>
                    <span className="text-right overflow-hidden text-ellipsis">Y</span>
                    <span className="text-right overflow-hidden text-ellipsis">Z</span>
                </div>

                {entities.map((entity) => (
                    <WSSubscribe key={entity.uuid} command={CommandEnum.UPDATE_ENTITY_PATCH_ID(listKey, entity.uuid)} initial={entity}>
                        {(entityDiff, entity) => {
                            Object.entries(entityDiff).forEach(([path, value]) => set(entity, path, value));
                            return <EntityEntry entity={entity}/>;
                        }}
                    </WSSubscribe>
                ))}
            </div>
        </div>
    );
}