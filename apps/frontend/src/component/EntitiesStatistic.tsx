import EntityTable from '@/component/entity/Table';
import MultipleHistoryChart from '@/component/MultipleHistoryChart';
import TypeCountTable from '@/component/typeCount/Table';
import useWSS from '@/hook/useWSS';
import ChunkStatusEnum from '@dasred/minecraft-entity-view-sdk/constant/ChunkStatusEnum';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import React, {ReactElement} from 'react';

export default function EntitiesStatisticComponent(): ReactElement | null {
    const statistic = useWSS<StatisticsInterface>(CommandEnum.STATISTIC_FULL);
    if (statistic === null) {
        return null;
    }

    return (
        <>
            <MultipleHistoryChart statistic={statistic}/>

            <div className="mt-5 flex flex-row gap-5 items-center">
                <div className="font-bold">Legend</div>
                <div data-status={ChunkStatusEnum.INACCESSIBLE} className="border border-default p-0.5">
                    <div className="opacity-inactive bg-inactive line-through">Block is unloaded</div>
                </div>

                <div data-status={ChunkStatusEnum.FULL} className="border border-default p-0.5">
                    <div className="opacity-inactive bg-inactive">Block is loaded but not active</div>
                </div>

                <div data-status={ChunkStatusEnum.BLOCK_TICKING} className="border border-default p-0.5">
                    <div className="opacity-inactive bg-red-100">Block is loaded and Redstone ticks</div>
                </div>

                <div data-status={ChunkStatusEnum.ENTITY_TICKING} className="border border-default p-0.5">
                    <div className="">Block is loaded and fully active</div>
                </div>
            </div>

            <div className="grid grid-cols-6 gap-3 mt-5">
                <EntityTable statistic={statistic} category={MobCategoryEnum.MONSTER}/>
                <EntityTable statistic={statistic} category={MobCategoryEnum.CREATURE}/>
                <EntityTable statistic={statistic} category={MobCategoryEnum.ITEM}/>
                <EntityTable statistic={statistic} category={MobCategoryEnum.MISC}/>
                <EntityTable statistic={statistic} category={MobCategoryEnum.OTHER}/>
                <TypeCountTable statistic={statistic}/>
            </div>
        </>
    );
}
