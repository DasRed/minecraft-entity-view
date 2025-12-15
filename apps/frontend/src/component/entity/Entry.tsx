import DimensionName from '@/constant/DimensionName';
import HighlightDuration from '@/constant/HighlightDuration';
import MobImages from '@/constant/MobImages';
import useHighlight from '@/hook/useHighlight';
import cn from '@/lib/cn';
import numberFormatter from '@/lib/numberFormater';
import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import React from 'react';

interface EntityRowOptionsInterface {
    entity: StatisticEntityInterface;
}

export default function EntityEntry({entity}: EntityRowOptionsInterface): React.ReactElement {
    const isRemoved = entity.stats.removeTimestamp !== null;

    const highlightNew   = useHighlight([entity.uuid]);
    const highlightX     = useHighlight([entity.x], HighlightDuration.FAST);
    const highlightY     = useHighlight([entity.y], HighlightDuration.FAST);
    const highlightZ     = useHighlight([entity.z], HighlightDuration.FAST);
    const highlightOrder = useHighlight([entity.stats.order], HighlightDuration.FAST);

    return (
        <div style={{order: entity.stats.order}} className={cn('w-full border-b border-default grid grid-cols-7 opacity-100 overflow-hidden transition-all duration-700', {
            'opacity-inactive bg-inactive line-through': entity.chunkLoaded === false,
            'bg-value-update-default':                   highlightOrder,
            'bg-value-new':                              highlightNew,
            'bg-value-removed opacity-removed':          isRemoved,
        })}>
            <div className="col-span-3 overflow-hidden text-ellipsis flex flex-row flex-nowrap items-center text-nowrap">
                {MobImages[entity.displayType] && <img src={MobImages[entity.displayType].replace('{size}', '16x16')} className="w-4 h-4 mr-1" alt=""/>}
                {MobImages[entity.displayType] === undefined && <div className="w-4 h-4 mr-1 bg-amber-400/50"/>}
                {entity.type === EntityTypeEnum.ITEM && `${entity.item.count}x `}{entity.customName ?? entity.displayName}
            </div>
            <div className="overflow-hidden text-ellipsis">{DimensionName[entity.dimension]}</div>
            <div className={cn('text-right overflow-hidden text-ellipsis', {'bg-value-update-second': highlightX})}>
                {numberFormatter.format(entity.x)}
            </div>
            <div className={cn('text-right overflow-hidden text-ellipsis', {'bg-value-update-second': highlightY})}>
                {numberFormatter.format(entity.y)}
            </div>
            <div className={cn('text-right overflow-hidden text-ellipsis', {'bg-value-update-second': highlightZ})}>
                {numberFormatter.format(entity.z)}
            </div>
        </div>
    );
}
