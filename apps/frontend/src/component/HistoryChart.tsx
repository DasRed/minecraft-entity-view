import useWSSHistoryPatch from '@/hook/useWSSHistoryPatch';
import cn from '@/lib/cn';
import HistoryCountEntryInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountEntryInterface';
import {ResponsiveLine} from '@nivo/line';
import {ReactElement} from 'react';

interface HistoryChartOptionsInterface {
    id?: string;
    history: HistoryCountEntryInterface[];
    command: string;
    className?: string;
}

export default function HistoryChart({className, id = 'count', history: historyInitial, command}: HistoryChartOptionsInterface): ReactElement {
    const history = useWSSHistoryPatch<HistoryCountEntryInterface>(historyInitial, command);

    return (
        <div className={cn('w-full h-50', className)}>
            <ResponsiveLine
                data={[{id, data: history}]}
                margin={{top: 10, right: 0, bottom: 10, left: 40}}
                yScale={{type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false}}
                axisBottom={null}
                axisLeft={{}}
                isInteractive={true}
                enableGridX={false}
                lineWidth={1}
                enablePoints={false}
                enableTouchCrosshair={false}
                useMesh={true}
                colors={{scheme: 'category10'}}
            />
        </div>
    );
}