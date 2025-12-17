import CountValue from '@/component/CountValue';
import EntityEntry from '@/component/entity/Entry';
import useWSSObjectListPatch from '@/hook/useWSSObjectListPatch';
import cn from '@/lib/cn';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import EntityOrderTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityOrderTypeEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import SortDirectionEnum from '@dasred/minecraft-entity-view-sdk/constant/SortDirectionEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {LucideChevronDown, LucideChevronUp} from 'lucide-react';
import {ReactElement, useState} from 'react';

interface EntitiesTableOptionsInterface {
    statistic: StatisticsInterface;
    category: MobCategoryEnum;
}

const MobCategoryTitle: Record<string, string> = {
    [MobCategoryEnum.OTHER]:    'Other',
    [MobCategoryEnum.CREATURE]: 'Creature',
    [MobCategoryEnum.ITEM]:     'Item',
    [MobCategoryEnum.MISC]:     'Misc',
    [MobCategoryEnum.MONSTER]:  'Monster',
};

export default function EntityTable({statistic, category}: EntitiesTableOptionsInterface): ReactElement {
    const entities                          = useWSSObjectListPatch<StatisticEntityInterface>(statistic.entity[category], CommandEnum.PATCH_ENTITIES_LIST(category));
    const [sortBy, setSortBy]               = useState<EntityOrderTypeEnum>(EntityOrderTypeEnum.NAME);
    const [sortDirection, setSortDirection] = useState<SortDirectionEnum>(SortDirectionEnum.ASC);

    function handleSort(by: EntityOrderTypeEnum) {
        if (by === sortBy && sortDirection === SortDirectionEnum.ASC) {
            setSortBy(EntityOrderTypeEnum.DEFAULT);
            setSortDirection(SortDirectionEnum.DESC);
            setSortDirection(sortDirection === SortDirectionEnum.ASC ? SortDirectionEnum.DESC : SortDirectionEnum.ASC);
        }
        else if (by === sortBy) {
            setSortDirection(SortDirectionEnum.ASC);
        }
        else {
            setSortBy(by);
        }
    }

    return (
        <div>
            <h2 className="font-extrabold text-xl">
                <span>{(category ? MobCategoryTitle[category] : undefined)}</span>
                <span className="text-sm font-normal pl-1">
                    <CountValue value={entities.length} command={CommandEnum.UPDATE_COUNT_MOB(category)}/>
                </span>
            </h2>

            <div className="flex flex-col text-sm">
                <div className="w-full font-bold border-b border-default grid grid-cols-7 cursor-pointer">
                    <span className="col-span-3 overflow-hidden text-ellipsis" onClick={() => handleSort(EntityOrderTypeEnum.NAME)}>
                        {sortBy === EntityOrderTypeEnum.NAME && sortDirection === SortDirectionEnum.ASC && <LucideChevronUp className="w-4 h-4 mr-0.5 inline-block"/>}
                        {sortBy === EntityOrderTypeEnum.NAME && sortDirection === SortDirectionEnum.DESC && <LucideChevronDown className="w-4 h-4 mr-0.5 inline-block"/>}
                        Name
                    </span>
                    <span className="overflow-hidden text-ellipsis" onClick={() => handleSort(EntityOrderTypeEnum.DIMENSION)}>
                        {sortBy === EntityOrderTypeEnum.DIMENSION && sortDirection === SortDirectionEnum.ASC && <LucideChevronUp className="w-4 h-4 mr-0.5 inline-block"/>}
                        {sortBy === EntityOrderTypeEnum.DIMENSION && sortDirection === SortDirectionEnum.DESC && <LucideChevronDown className="w-4 h-4 mr-0.5 inline-block"/>}
                        Dimension
                    </span>
                    <span className="text-right overflow-hidden text-ellipsis" onClick={() => handleSort(EntityOrderTypeEnum.POSITION)}>
                        {sortBy === EntityOrderTypeEnum.POSITION && sortDirection === SortDirectionEnum.ASC && <LucideChevronUp className="w-4 h-4 mr-0.5 inline-block"/>}
                        {sortBy === EntityOrderTypeEnum.POSITION && sortDirection === SortDirectionEnum.DESC && <LucideChevronDown className="w-4 h-4 mr-0.5 inline-block"/>}
                        X
                    </span>
                    <span className="text-right overflow-hidden text-ellipsis" onClick={() => handleSort(EntityOrderTypeEnum.POSITION)}>
                        Y
                    </span>
                    <span className="text-right overflow-hidden text-ellipsis" onClick={() => handleSort(EntityOrderTypeEnum.POSITION)}>
                        Z
                    </span>
                </div>

                <div className={cn('flex', {
                    'flex-col':         sortDirection === SortDirectionEnum.ASC,
                    'flex-col-reverse': sortDirection === SortDirectionEnum.DESC,
                })}>
                    {entities.map((entity) => <EntityEntry key={entity.uuid} entity={entity} sortBy={sortBy}/>)}
                </div>
            </div>
        </div>
    );
}