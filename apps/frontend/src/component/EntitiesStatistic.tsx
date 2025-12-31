import EntityTable from '@/component/entity/Table';
import MultipleHistoryChart from '@/component/MultipleHistoryChart';
import TypeCountTable from '@/component/typeCount/Table';
import EntityFilterTypeEnum from '@/constant/EntityFilterTypeEnum';
import useWSS from '@/hook/useWSS';
import cn from '@/lib/cn';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import React, {ReactElement, useState} from 'react';


const LegendEntries = [
    {className: 'opacity-inactive bg-inactive line-through', status: EntityFilterTypeEnum.CHUNK_STATUS_INACCESSIBLE, text: 'Unloaded'},
    {className: 'opacity-inactive bg-inactive', status: EntityFilterTypeEnum.CHUNK_STATUS_FULL, text: 'Inactive'},
    {className: 'opacity-inactive bg-red-100', status: EntityFilterTypeEnum.CHUNK_STATUS_BLOCK_TICKING, text: 'Redstone'},
    {className: '', status: EntityFilterTypeEnum.CHUNK_STATUS_ENTITY_TICKING, text: 'Full active'},

    {className: 'bg-value-removed opacity-removed', status: EntityFilterTypeEnum.ENTITY_IS_DELETED, text: 'Deleted'},

    {className: '', status: EntityFilterTypeEnum.DIMENSION_OVERWORLD, text: 'Overworld'},
    {className: '', status: EntityFilterTypeEnum.DIMENSION_NETHER, text: 'Nether'},
    {className: '', status: EntityFilterTypeEnum.DIMENSION_END, text: 'End'},
];

const StatusToShowDefault: EntityFilterTypeEnum[] = [
    // EntityFilterTypeEnum.CHUNK_STATUS_INACCESSIBLE,
    // EntityFilterTypeEnum.CHUNK_STATUS_FULL,
    // EntityFilterTypeEnum.CHUNK_STATUS_BLOCK_TICKING,
    EntityFilterTypeEnum.CHUNK_STATUS_ENTITY_TICKING,

    // EntityFilterTypeEnum.ENTITY_IS_DELETED,
    EntityFilterTypeEnum.DIMENSION_OVERWORLD,
    EntityFilterTypeEnum.DIMENSION_NETHER,
    EntityFilterTypeEnum.DIMENSION_END,
];

export default function EntitiesStatisticComponent(): ReactElement | null {
    const [statusToShow, setStatusToShow] = useState<EntityFilterTypeEnum[]>([...StatusToShowDefault]);
    const statistic                       = useWSS<StatisticsInterface>(CommandEnum.STATISTIC_FULL);
    if (statistic === null) {
        return null;
    }

    function toggleStatusToShow(statusToToggle: EntityFilterTypeEnum) {
        if (statusToShow.includes(statusToToggle)) {
            setStatusToShow(statusToShow.filter((value) => value !== statusToToggle));
        }
        else {
            setStatusToShow([...statusToShow, statusToToggle]);
        }
    }

    return (
        <>
            <MultipleHistoryChart statistic={statistic}/>

            <div className="mt-5 flex flex-row gap-5 items-center">
                <div className="font-bold">Chunk Legend</div>
                {LegendEntries.map((entry) =>
                    <div key={entry.status} data-chunk-status={entry.status} onClick={() => toggleStatusToShow(entry.status)} className={cn('border border-default py-0.5 px-2 rounded cursor-pointer transition-all', entry.className, {
                        'border-teal-600 border-2': statusToShow.includes(entry.status),
                    })}>
                        {entry.text}
                    </div>,
                )}
            </div>

            <div className="grid grid-cols-6 gap-3 mt-5">
                <EntityTable statistic={statistic} category={MobCategoryEnum.MONSTER} statusToShow={statusToShow}/>
                <EntityTable statistic={statistic} category={MobCategoryEnum.CREATURE} statusToShow={statusToShow}/>
                <EntityTable statistic={statistic} category={MobCategoryEnum.ITEM} statusToShow={statusToShow}/>
                <EntityTable statistic={statistic} category={MobCategoryEnum.MISC} statusToShow={statusToShow}/>
                <EntityTable statistic={statistic} category={MobCategoryEnum.OTHER} statusToShow={statusToShow}/>
                <TypeCountTable statistic={statistic}/>
            </div>
        </>
    );
}
