'use client';

import useWSSHistoryPatch from '@/hook/useWSSHistoryPatch';
import cn from '@/lib/cn';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import HistoryCountEntryInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountEntryInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {ResponsiveLine} from '@nivo/line';
import {ReactElement} from 'react';

interface MultipleHistoryChartOptionsInterface {
    className?: string;
    statistic: StatisticsInterface;
}

export default function MultipleHistoryChart({className, statistic}: MultipleHistoryChartOptionsInterface): ReactElement {
    const historyMonsters = useWSSHistoryPatch<HistoryCountEntryInterface>(statistic.count.history.mobCategory[MobCategoryEnum.MONSTER], CommandEnum.PATCH_COUNT_HISTORY_MOB(MobCategoryEnum.MONSTER));
    const historyCreatures = useWSSHistoryPatch<HistoryCountEntryInterface>(statistic.count.history.mobCategory[MobCategoryEnum.CREATURE], CommandEnum.PATCH_COUNT_HISTORY_MOB(MobCategoryEnum.CREATURE));
    const historyItems = useWSSHistoryPatch<HistoryCountEntryInterface>(statistic.count.history.mobCategory[MobCategoryEnum.ITEM], CommandEnum.PATCH_COUNT_HISTORY_MOB(MobCategoryEnum.ITEM));
    const historyMisc = useWSSHistoryPatch<HistoryCountEntryInterface>(statistic.count.history.mobCategory[MobCategoryEnum.MISC], CommandEnum.PATCH_COUNT_HISTORY_MOB(MobCategoryEnum.MISC));
    const historyOthers = useWSSHistoryPatch<HistoryCountEntryInterface>(statistic.count.history.mobCategory[MobCategoryEnum.OTHER], CommandEnum.PATCH_COUNT_HISTORY_MOB(MobCategoryEnum.OTHER));

    return (
        <div className={cn('w-full h-150', className)}>
            <ResponsiveLine
                data={[
                    {id: 'Other', data: historyOthers},
                    {id: 'Misc', data: historyMisc},
                    {id: 'Item', data: historyItems},
                    {id: 'Creature', data: historyCreatures},
                    {id: 'Monster', data: historyMonsters},
                ]}
                margin={{top: 10, right: 0, bottom: 10, left: 40}}
                yScale={{type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false}}
                axisBottom={null}
                axisLeft={{}}
                isInteractive={true}
                enableGridX={false}
                lineWidth={1}
                enablePoints={false}
                enableTouchCrosshair={false}
                useMesh={true}
                colors={{scheme: 'set1'}}
                curve="monotoneX"
                legends={[
                    {
                        anchor: 'top',
                        direction: 'row',
                        itemWidth: 80,
                        itemHeight: 22,
                        symbolShape: 'circle',
                    }
                ]}
            />
        </div>
    );
}