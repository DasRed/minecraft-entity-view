import HistoryChart from '@/component/HistoryChart';
import EntityEntry from '@/component/entity/Entry';
import CountValue from '@/component/CountValue';
import WSSubscribe from '@/component/WSSubscribe';
import useWSSObjectListPatch from '@/hook/useWSSObjectListPatch';
import numberFormatter from '@/lib/numberFormater';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {set} from 'lodash-es';
import {ReactElement} from 'react';

interface EntitiesTableOptionsInterface {
    statistic: StatisticsInterface;
    category: MobCategoryEnum;
}

const MobCategoryTitle: Record<string, string> = {
    [MobCategoryEnum.OTHER]:    'Other',
    [MobCategoryEnum.CREATURE]: 'Creature',
    [MobCategoryEnum.ITEM]:     'Item',
    [MobCategoryEnum.MISC]:     'Misc',
    [MobCategoryEnum.MONSTER]:  'Monster',
};

export default function EntityTable({statistic, category}: EntitiesTableOptionsInterface): ReactElement {
    const entities = useWSSObjectListPatch<StatisticEntityInterface>(statistic.entity[category], CommandEnum.PATCH_ENTITIES_LIST(category));

    return (
        <div>
            <h2 className="font-extrabold text-xl">
                <span>{(category ? MobCategoryTitle[category] : undefined)}</span>
                <span className="text-sm font-normal pl-1">
                    <WSSubscribe command={CommandEnum.UPDATE_COUNT_MOB(category)} initial={Object.values(entities).length}>
                        {(value) => <CountValue value={value} />}
                    </WSSubscribe>
                </span>
            </h2>

            <HistoryChart command={CommandEnum.PATCH_COUNT_HISTORY_MOB(category)} history={statistic.count.history.mobCategory[category]}/>

            <div className="flex flex-col-reverse text-sm">
                <div className="w-full font-bold border-b border-default order-last grid grid-cols-7">
                    <span className="col-span-3 overflow-hidden text-ellipsis">Name</span>
                    <span className="overflow-hidden text-ellipsis">Dimension</span>
                    <span className="text-right overflow-hidden text-ellipsis">X</span>
                    <span className="text-right overflow-hidden text-ellipsis">Y</span>
                    <span className="text-right overflow-hidden text-ellipsis">Z</span>
                </div>

                {entities.map((entity) => (
                    <WSSubscribe key={entity.uuid} command={CommandEnum.PATCH_ENTITIES_ID(category, entity.uuid)} initial={entity}>
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