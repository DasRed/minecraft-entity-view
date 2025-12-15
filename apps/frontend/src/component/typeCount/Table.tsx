import CountValue from '@/component/CountValue';
import HistoryChart from '@/component/HistoryChart';
import TypeCountEntry from '@/component/typeCount/Entry';
import WSSubscribe from '@/component/WSSubscribe';
import useWSSObjectListPatch from '@/hook/useWSSObjectListPatch';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import StatisticTypeCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/TypeCountInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {set} from 'lodash-es';
import {ReactElement} from 'react';

interface EntitiesCountTableOptionsInterface {
    statistic: StatisticsInterface;
}

export default function TypeCountTable({statistic}: EntitiesCountTableOptionsInterface): ReactElement {
    const entities = useWSSObjectListPatch<StatisticTypeCountInterface>(statistic.entityTypeCount, CommandEnum.PATCH_TYPE_COUNT_LIST);

    return (
        <div>
            <h2 className="font-extrabold text-xl">
                <span>Type Count</span>
                <span className="text-sm font-normal pl-1">
                    <WSSubscribe command={CommandEnum.UPDATE_COUNT_TOTAL} initial={statistic.count.total}>
                        {(value) => <CountValue value={value} />}
                    </WSSubscribe>
                </span>
            </h2>

            <HistoryChart command={CommandEnum.PATCH_COUNT_HISTORY_TOTAL} history={statistic.count.history.total}/>

            <div className="flex flex-col text-sm">
                <div className="flex flex-row w-full font-bold border-b border-default order-first">
                    <span className="w-3/4">Type</span>
                    <span className="w-1/4 text-right">Count</span>
                </div>

                {entities.map((entity) => (
                    <WSSubscribe key={entity.type} command={CommandEnum.PATCH_TYPE_COUNT_ID(entity.type)} initial={entity}>
                        {(entityDiff, entity) => {
                            Object.entries(entityDiff).forEach(([path, value]) => set(entity, path, value));
                            return <TypeCountEntry entity={entity}/>;
                        }}
                    </WSSubscribe>
                ))}
            </div>
        </div>
    );
}