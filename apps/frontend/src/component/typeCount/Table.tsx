'use client';

import CountValue from '@/component/CountValue';
import TypeCountEntry, {TypeCountSortByEnum} from '@/component/typeCount/Entry';
import useWSSObjectListPatch from '@/hook/useWSSObjectListPatch';
import cn from '@/lib/cn';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import SortDirectionEnum from '@dasred/minecraft-entity-view-sdk/constant/SortDirectionEnum';
import StatisticTypeCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/TypeCountInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {LucideChevronDown, LucideChevronUp} from 'lucide-react';
import {ReactElement, useState} from 'react';

interface EntitiesCountTableOptionsInterface {
    statistic: StatisticsInterface;
}

export default function TypeCountTable({statistic}: EntitiesCountTableOptionsInterface): ReactElement {
    const entities                          = useWSSObjectListPatch<StatisticTypeCountInterface>(statistic.entityTypeCount, CommandEnum.PATCH_TYPE_COUNT_LIST);
    const [sortBy, setSortBy]               = useState<TypeCountSortByEnum>(TypeCountSortByEnum.TYPE);
    const [sortDirection, setSortDirection] = useState<SortDirectionEnum>(SortDirectionEnum.ASC);

    function handleSort(by: TypeCountSortByEnum) {
        if (by === sortBy) {
            setSortDirection(sortDirection === SortDirectionEnum.ASC ? SortDirectionEnum.DESC : SortDirectionEnum.ASC);
        }
        else {
            setSortBy(by);
        }
    }

    return (
        <div>
            <h2 className="font-extrabold text-xl">
                <span>Type Count</span>
                <span className="text-sm font-normal pl-1">
                    <CountValue value={statistic.count.total} command={CommandEnum.UPDATE_COUNT_TOTAL}/>
                </span>
            </h2>

            <div className="flex flex-col text-sm">
                <div className="flex flex-row w-full font-bold border-b border-default cursor-pointer">
                    <span className="w-3/4" onClick={() => handleSort(TypeCountSortByEnum.TYPE)}>
                        {sortBy === TypeCountSortByEnum.TYPE && sortDirection === SortDirectionEnum.ASC && <LucideChevronUp className="w-4 h-4 mr-0.5 inline-block"/>}
                        {sortBy === TypeCountSortByEnum.TYPE && sortDirection === SortDirectionEnum.DESC && <LucideChevronDown className="w-4 h-4 mr-0.5 inline-block"/>}
                        Type
                    </span>
                    <span className="w-1/4 text-right" onClick={() => handleSort(TypeCountSortByEnum.COUNT)}>
                        {sortBy === TypeCountSortByEnum.COUNT && sortDirection === SortDirectionEnum.ASC && <LucideChevronUp className="w-4 h-4 mr-0.5 inline-block"/>}
                        {sortBy === TypeCountSortByEnum.COUNT && sortDirection === SortDirectionEnum.DESC && <LucideChevronDown className="w-4 h-4 mr-0.5 inline-block"/>}
                        Count
                    </span>
                </div>

                <div className={cn('flex', {
                    'flex-col':         sortDirection === SortDirectionEnum.ASC,
                    'flex-col-reverse': sortDirection === SortDirectionEnum.DESC,
                })}>
                    {entities.map((entity) => <TypeCountEntry key={entity.type} entity={entity} sortBy={sortBy}/>)}
                </div>
            </div>
        </div>
    );
}