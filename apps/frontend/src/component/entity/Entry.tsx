import EntityDisplayNameBlockDisplay from '@/component/EntityDisplayNameBlockDisplay';
import EntityDisplayNameItem from '@/component/EntityDisplayNameItem';
import EntityDisplayNameOther from '@/component/EntityDisplayNameOther';
import DimensionName from '@/constant/DimensionName';
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
    const highlightNew = useHighlight([entity.uuid]);
    const isRemoved    = entity.stats.removeTimestamp !== null;

    return (
        <div style={{order: entity.stats.order}} className={cn('w-full border-b border-default grid grid-cols-7 opacity-100 overflow-hidden transition-all duration-700', {
            'opacity-50 bg-gray-300 line-through': entity.chunkLoaded === false,
            'bg-orange-400/30':                    entity.stats.moved === true,
            'bg-green-500/30':                     highlightNew,
            'bg-red-500/30 opacity-25':            isRemoved,
        })}>
            <div className="col-span-3 overflow-hidden text-ellipsis flex flex-row flex-nowrap items-center text-nowrap">
                {entity.type === EntityTypeEnum.ITEM && <EntityDisplayNameItem entity={entity}/>}
                {entity.type !== EntityTypeEnum.ITEM && entity.type === EntityTypeEnum.BLOCK_DISPLAY && <EntityDisplayNameBlockDisplay entity={entity}/>}
                {[EntityTypeEnum.ITEM, EntityTypeEnum.BLOCK_DISPLAY].includes(entity.type) === false && <EntityDisplayNameOther entity={entity}/>}
            </div>
            <div className="overflow-hidden text-ellipsis">{DimensionName[entity.dimension]}</div>
            <div className="text-right overflow-hidden text-ellipsis">{numberFormatter.format(entity.x)}</div>
            <div className="text-right overflow-hidden text-ellipsis">{numberFormatter.format(entity.y)}</div>
            <div className="text-right overflow-hidden text-ellipsis">{numberFormatter.format(entity.z)}</div>
        </div>
    );
}
