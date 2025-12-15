import MobImage from '@/component/MobImage';
import useHighlight from '@/hook/useHighlight';
import cn from '@/lib/cn';
import numberFormatter from '@/lib/numberFormater';
import StatisticTypeCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/TypeCountInterface';
import {ReactElement} from 'react';

export enum TypeCountSortByEnum {
    TYPE,
    COUNT,
}

interface TypeCountEntryOptionsInterface {
    entity: StatisticTypeCountInterface;
    sortBy?: TypeCountSortByEnum;
}

export default function TypeCountEntry({entity, sortBy = TypeCountSortByEnum.TYPE}: TypeCountEntryOptionsInterface): ReactElement {
    const highlight = useHighlight(entity.count);

    return (
        <div style={{order: sortBy === TypeCountSortByEnum.COUNT ? entity.order.count : entity.order.name}} className={cn('flex flex-row w-full border-b border-default transition-colors duration-700', {
            'bg-red-500/30': highlight,
        })}>
            <div className="w-3/4 flex flex-row items-center">
                <MobImage type={entity.type} className="w-4 h-4 mr-1"/>
                {entity.name}
            </div>
            <div className="w-1/4 text-right">
                {numberFormatter.format(entity.count)}
            </div>
        </div>
    );
}