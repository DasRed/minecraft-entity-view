import EntityDisplayNameBlockDisplay from '@/component/EntityDisplayNameBlockDisplay';
import EntityDisplayNameOther from '@/component/EntityDisplayNameOther';
import EntityDisplayNameItem from '@/component/EntityDisplayNameItem';
import DimensionName from '@/constant/DimensionName';
import cn from '@/lib/cn';
import numberFormatter from '@/lib/numberFormater';
import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import React from 'react';

interface EntityRowOptionsInterface {
    entity: StatisticEntityInterface;
}

export default function EntityRow({entity}: EntityRowOptionsInterface): React.ReactElement {
    const lifetime = (new Date().getTime() - entity.stats.firstSeen.getTime()) / 1000;

    return (
        <tr className={cn('border-b border-default', {
            'bg-red-50':                  entity.stats.movedFromFirstPosition === false && entity.stats.movedFromPreviousPosition === false && lifetime < 20,
            'bg-red-100':                 entity.stats.movedFromFirstPosition === false && entity.stats.movedFromPreviousPosition === false && lifetime >= 20 && lifetime < 40,
            'bg-red-200':                 entity.stats.movedFromFirstPosition === false && entity.stats.movedFromPreviousPosition === false && lifetime >= 40 && lifetime < 60,
            'bg-red-300':                 entity.stats.movedFromFirstPosition === false && entity.stats.movedFromPreviousPosition === false && lifetime >= 60 && lifetime < 80,
            'bg-red-400':                 entity.stats.movedFromFirstPosition === false && entity.stats.movedFromPreviousPosition === false && lifetime >= 80 && lifetime < 100,
            'bg-red-500':                 entity.stats.movedFromFirstPosition === false && entity.stats.movedFromPreviousPosition === false && lifetime >= 100 && lifetime < 120,
            'bg-red-600 text-yellow-300': entity.stats.movedFromFirstPosition === false && entity.stats.movedFromPreviousPosition === false && lifetime >= 120 && lifetime < 140,
            'bg-red-700 text-yellow-300': entity.stats.movedFromFirstPosition === false && entity.stats.movedFromPreviousPosition === false && lifetime >= 140 && lifetime < 160,
            'bg-red-800 text-yellow-300': entity.stats.movedFromFirstPosition === false && entity.stats.movedFromPreviousPosition === false && lifetime >= 160 && lifetime < 180,
            'bg-red-900 text-yellow-300': entity.stats.movedFromFirstPosition === false && entity.stats.movedFromPreviousPosition === false && lifetime > 180,
            'bg-green-700':               entity.stats.movedFromFirstPosition === true && entity.stats.movedFromPreviousPosition === false,
            'bg-green-500':               entity.stats.movedFromPreviousPosition === true,
            'opacity-50 line-through':    entity.chunkLoaded === false,
        })}>
            <td className="flex flex-row items-center">
                {entity.type === EntityTypeEnum.ITEM && <EntityDisplayNameItem entity={entity}/>}
                {entity.type !== EntityTypeEnum.ITEM && entity.type === EntityTypeEnum.BLOCK_DISPLAY && <EntityDisplayNameBlockDisplay entity={entity}/>}
                {[EntityTypeEnum.ITEM, EntityTypeEnum.BLOCK_DISPLAY].includes(entity.type) === false && <EntityDisplayNameOther entity={entity}/>}
            </td>
            <td>{DimensionName[entity.dimension]}</td>
            <td>{numberFormatter.format(entity.x)}</td>
            <td>{numberFormatter.format(entity.y)}</td>
            <td>{numberFormatter.format(entity.z)}</td>
        </tr>
    );
}