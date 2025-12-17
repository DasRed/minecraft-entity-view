'use client';

import EntityTable from '@/component/entity/Table';
import MultipleHistoryChart from '@/component/MultipleHistoryChart';
import TypeCountTable from '@/component/typeCount/Table';
import useWSS from '@/hook/useWSS';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import React, {ReactElement} from 'react';

export default function EntitiesStatisticComponent(): ReactElement | null {
    const statistic = useWSS<StatisticsInterface>(CommandEnum.FULL_STATISTIC);
    if (statistic === null) {
        return null;
    }

    return (
        <>
            <MultipleHistoryChart statistic={statistic}/>

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
