import MobImages from '@/constant/MobImages';
import useHighlight from '@/hook/useHighlight';
import cn from '@/lib/cn';
import numberFormatter from '@/lib/numberFormater';
import StatisticTypeCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/TypeCountInterface';
import {ReactElement} from 'react';

interface TypeCountEntryOptionsInterface {
    entity: StatisticTypeCountInterface;
}

export default function TypeCountEntry({entity}: TypeCountEntryOptionsInterface): ReactElement {
    const highlight = useHighlight([entity.count]);

    return (
        <div style={{order: entity.count}} className={cn('flex flex-row w-full border-b border-default transition-colors duration-700', {
            'bg-red-500/30': highlight,
        })}>
            <div className="w-3/4 flex flex-row items-center">
                {MobImages[entity.type] && <img src={MobImages[entity.type].replace('{size}', '16x16')} className="w-4 h-4 mr-1" alt=""/>}
                {MobImages[entity.type] === undefined && <div className="w-4 h-4 mr-1 bg-amber-400/50"/>}
                {entity.name}
            </div>
            <div className="w-1/4 text-right">
                {numberFormatter.format(entity.count)}
            </div>
        </div>
    );
}