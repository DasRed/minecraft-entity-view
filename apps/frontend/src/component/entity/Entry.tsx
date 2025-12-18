import MobImage from '@/component/MobImage';
import DimensionName from '@/constant/DimensionName';
import useWSS from '@/hook/useWSS';
import cn from '@/lib/cn';
import numberFormatter from '@/lib/numberFormater';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import EntityOrderTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityOrderTypeEnum';
import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import {set} from 'lodash-es';
import React from 'react';

interface EntityRowOptionsInterface {
    entity: StatisticEntityInterface;
    sortBy?: EntityOrderTypeEnum;
}

export default function EntityEntry({entity: entityInitial, sortBy = EntityOrderTypeEnum.DEFAULT}: EntityRowOptionsInterface): React.ReactElement {
    const patch        = useWSS<Partial<StatisticEntityInterface>>(CommandEnum.PATCH_ENTITIES_ID(entityInitial.uuid), {});
    const entity = {...entityInitial};
    Object.entries(patch).forEach(([path, value]) => set(entity, path, value));

    return (
        <div
            key={entity.uuid}
            data-id={entity.uuid}
            data-type={entity.type}
            style={{order: entity.stats.order[sortBy]}}
            className={cn('w-full border-b border-default grid grid-cols-7 opacity-100 overflow-hidden transition-all duration-700', {
            'opacity-inactive bg-inactive line-through': entity.chunkLoaded === false,
            'bg-value-new':                              entity.stats.isNew,
            'bg-value-removed opacity-removed':          entity.stats.isDeleted,
        })}
        >
            <div className="col-span-3 overflow-hidden text-ellipsis flex flex-row flex-nowrap items-center text-nowrap">
                <MobImage type={entity.displayType} className="w-4 h-4 mr-1"/>
                {entity.type === EntityTypeEnum.ITEM && `${entity.item.count}x `}{entity.customName ?? entity.displayName}
            </div>
            <div className="overflow-hidden text-ellipsis">{DimensionName[entity.dimension]}</div>
            <div className={cn('text-right overflow-hidden text-ellipsis transition-all duration-700', {'bg-value-update': entity.stats.isMoved})}>
                {numberFormatter.format(entity.x)}
            </div>
            <div className={cn('text-right overflow-hidden text-ellipsis transition-all duration-700', {'bg-value-update': entity.stats.isMoved})}>
                {numberFormatter.format(entity.y)}
            </div>
            <div className={cn('text-right overflow-hidden text-ellipsis transition-all duration-700', {'bg-value-update': entity.stats.isMoved})}>
                {numberFormatter.format(entity.z)}
            </div>
        </div>
    );
}
