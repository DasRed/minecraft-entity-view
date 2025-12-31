import DimensionImage from '@/component/DimensionImage';
import MobImage from '@/component/MobImage';
import DimensionName from '@/constant/DimensionName';
import EntityFilterTypeEnum from '@/constant/EntityFilterTypeEnum';
import useWSSPatch from '@/hook/useWSSPatch';
import cn from '@/lib/cn';
import numberFormatter from '@/lib/numberFormater';
import ChunkStatusEnum from '@dasred/minecraft-entity-view-sdk/constant/ChunkStatusEnum';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import EntityOrderTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityOrderTypeEnum';
import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import React from 'react';

interface EntityRowOptionsInterface {
    entity: StatisticEntityInterface;
    sortBy?: EntityOrderTypeEnum;
    statusToShow: EntityFilterTypeEnum[];
}

export default function EntityEntry({entity: entityInitial, statusToShow, sortBy = EntityOrderTypeEnum.DEFAULT}: EntityRowOptionsInterface): React.ReactElement {
    const entity = useWSSPatch<StatisticEntityInterface>(entityInitial, CommandEnum.STATISTIC_PATCH_ENTITIES_ID(entityInitial.uuid));

    return (
        <div
            key={entity.uuid}
            data-id={entity.uuid}
            data-type={entity.type}
            style={{order: entity.stats.order[sortBy]}}
            className={cn('w-full border-b border-default grid grid-cols-12 opacity-100 overflow-hidden transition-all duration-700', {
                'opacity-inactive bg-inactive line-through': entity.chunk.status === ChunkStatusEnum.INACCESSIBLE,
                'opacity-inactive bg-inactive':              entity.chunk.status === ChunkStatusEnum.FULL,
                'opacity-inactive bg-red-100':               entity.chunk.status === ChunkStatusEnum.BLOCK_TICKING,
                'bg-value-new':                              entity.stats.isNew,
                'bg-value-removed opacity-removed':          entity.stats.isDeleted,
                'hidden':                                    (entity.chunk.status === ChunkStatusEnum.INACCESSIBLE && statusToShow.includes(EntityFilterTypeEnum.CHUNK_STATUS_INACCESSIBLE) === false)
                                                                 || (entity.chunk.status === ChunkStatusEnum.FULL && statusToShow.includes(EntityFilterTypeEnum.CHUNK_STATUS_FULL) === false)
                                                                 || (entity.chunk.status === ChunkStatusEnum.BLOCK_TICKING && statusToShow.includes(EntityFilterTypeEnum.CHUNK_STATUS_BLOCK_TICKING) === false)
                                                                 || (entity.chunk.status === ChunkStatusEnum.ENTITY_TICKING && statusToShow.includes(EntityFilterTypeEnum.CHUNK_STATUS_ENTITY_TICKING) === false)

                                                                 || (entity.stats.isDeleted === true && statusToShow.includes(EntityFilterTypeEnum.ENTITY_IS_DELETED) === false)

                                                                 || (entity.dimension === DimensionEnum.OVERWORLD && statusToShow.includes(EntityFilterTypeEnum.DIMENSION_OVERWORLD) === false)
                                                                 || (entity.dimension === DimensionEnum.NETHER && statusToShow.includes(EntityFilterTypeEnum.DIMENSION_NETHER) === false)
                                                                 || (entity.dimension === DimensionEnum.END && statusToShow.includes(EntityFilterTypeEnum.DIMENSION_END) === false)
                ,
            })}
        >
            <div className="overflow-hidden text-ellipsis flex flex-col flex-nowrap items-center text-nowrap" title={DimensionName[entity.dimension]}>
                <DimensionImage dimension={entity.dimension} className="w-4 h-4 mr-1"/>
            </div>
            <div className="col-span-5 overflow-hidden text-ellipsis flex flex-row flex-nowrap items-center text-nowrap">
                <MobImage type={entity.displayType} className="w-4 h-4 mr-1"/>
                {entity.type === EntityTypeEnum.ITEM && `${entity.item.count}x `}{entity.customName ?? entity.displayName}
            </div>
            <div className={cn('col-span-2 text-right overflow-hidden text-ellipsis transition-all duration-700', {'bg-value-update': entity.stats.isMoved})}>
                {numberFormatter.format(entity.x)}
            </div>
            <div className={cn('col-span-2 text-right overflow-hidden text-ellipsis transition-all duration-700', {'bg-value-update': entity.stats.isMoved})}>
                {numberFormatter.format(entity.y)}
            </div>
            <div className={cn('col-span-2 text-right overflow-hidden text-ellipsis transition-all duration-700', {'bg-value-update': entity.stats.isMoved})}>
                {numberFormatter.format(entity.z)}
            </div>
        </div>
    );
}
