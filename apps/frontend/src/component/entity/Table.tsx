import EntityEntry from '@/component/entity/Entry';
import EntitySummaryValue from '@/component/EntitySummaryValue';
import WSSubscribe from '@/component/WSSubscribe';
import useWSSListModify from '@/hook/useWSSListModify';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobListEnum from '@dasred/minecraft-entity-view-sdk/constant/MobListEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import StatisticEntityListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityListInterface';
import {set} from 'lodash-es';
import {ReactElement, useEffect, useState} from 'react';

interface EntitiesTableOptionsInterface {
    entities: StatisticEntityListInterface;
    category: MobListEnum;
}

const MobCategoryTitle: Record<string, string> = {
    [MobListEnum.OTHER]:    'Other',
    [MobListEnum.CREATURE]: 'Creature',
    [MobListEnum.ITEM]:     'Item',
    [MobListEnum.MISC]:     'Misc',
    [MobListEnum.MONSTER]:  'Monster',
};

export default function EntityTable({entities: entitiesInitial, category}: EntitiesTableOptionsInterface): ReactElement {
    const {entities}          = useWSSListModify<StatisticEntityInterface>(entitiesInitial, CommandEnum.UPDATE_ENTITY_MODIFY(category));
    const [counts, setCounts] = useState<{ x: Date, y: number }[]>([]);

    useEffect(() => {
        if (counts.length === 0 || counts[counts.length - 1].y !== entities.length) {
            setCounts((prev) => [...prev, {x: new Date(), y: entities.length}].slice(-1000));
        }
    }, [entities]);

    return (
        <div>
            <h2 className="font-extrabold text-xl">
                <span>{(category ? MobCategoryTitle[category] : undefined)}</span>
                <span className="text-sm font-normal pl-1">
                    (<EntitySummaryValue command={CommandEnum[`UPDATE_COUNT_MOB_${category}`]} initial={Object.values(entities).length}></EntitySummaryValue>)
                </span>
            </h2>

            {/*<div className="w-full h-50">*/}
            {/*    <ResponsiveLine*/}
            {/*        data={[{id: 'counts', data: counts}]}*/}
            {/*        margin={{top: 10, right: 0, bottom: 10, left: 40}}*/}
            {/*        yScale={{type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false}}*/}
            {/*        axisBottom={null}*/}
            {/*        axisLeft={{}}*/}
            {/*        isInteractive={true}*/}
            {/*        enableGridX={false}*/}
            {/*        lineWidth={1}*/}
            {/*        enablePoints={false}*/}
            {/*        enableTouchCrosshair={false}*/}
            {/*        useMesh={true}*/}
            {/*        colors={{scheme: 'category10'}}*/}
            {/*    />*/}
            {/*</div>*/}

            <div className="flex flex-col-reverse text-sm">
                <div className="w-full font-bold border-b border-default order-last grid grid-cols-7">
                    <span className="col-span-3 overflow-hidden text-ellipsis">Name</span>
                    <span className="overflow-hidden text-ellipsis">Dimension</span>
                    <span className="text-right overflow-hidden text-ellipsis">X</span>
                    <span className="text-right overflow-hidden text-ellipsis">Y</span>
                    <span className="text-right overflow-hidden text-ellipsis">Z</span>
                </div>

                {entities.map((entity) => (
                    <WSSubscribe key={entity.uuid} command={CommandEnum.UPDATE_ENTITY_PATCH_ID(category, entity.uuid)} initial={entity}>
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