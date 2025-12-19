import MobImage from '@/component/MobImage';
import useHighlight from '@/hook/useHighlight';
import useWSS from '@/hook/useWSS';
import cn from '@/lib/cn';
import numberFormatter from '@/lib/numberFormater';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import TypeCountOrderTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/TypeCountOrderTypeEnum';
import StatisticTypeCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/TypeCountInterface';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import {set} from 'lodash-es';
import {ReactElement} from 'react';

interface TypeCountEntryOptionsInterface {
    entity: StatisticTypeCountInterface;
    sortBy?: TypeCountOrderTypeEnum;
}

export default function TypeCountEntry({entity: entityInitial, sortBy = TypeCountOrderTypeEnum.TYPE}: TypeCountEntryOptionsInterface): ReactElement {
    const patch  = useWSS<Partial<StatisticEntityInterface>>(CommandEnum.STATISTIC_PATCH_TYPE_COUNT_ID(entityInitial.type), {});
    const entity = {...entityInitial};
    Object.entries(patch).forEach(([path, value]) => set(entity, path, value));
    const highlight = useHighlight(entity.count);

    return (
        <div
            key={`count-${entity.type}`}
            data-type={entity.type}
            style={{order: sortBy === TypeCountOrderTypeEnum.COUNT ? entity.order.count : entity.order.name}}
            className={cn('flex flex-row w-full border-b border-default transition-colors duration-700', {
                'bg-red-500/30': highlight,
            })}
        >
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