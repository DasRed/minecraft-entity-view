'use client';

import EntityTable from '@/component/entity/Table';
import EntitySummary from '@/component/EntitySummary';
import TypeCountTable from '@/component/typeCount/Table';
import WSSubscribe from '@/component/WSSubscribe';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobListEnum from '@dasred/minecraft-entity-view-sdk/constant/MobListEnum';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import React, {ReactElement} from 'react';

export default function EntitiesStatisticComponent(): ReactElement | null {
    return (
        <WSSubscribe<StatisticsInterface> command={CommandEnum.FULL_ENTITY_STATISTIC}>
            {(value) => (
                <>
                    <EntitySummary count={value.count}/>

                    <div className="grid grid-cols-6 gap-3 mt-5">
                        <EntityTable entities={value.entity.monster} category={MobListEnum.MONSTER}/>
                        <EntityTable entities={value.entity.creature} category={MobListEnum.CREATURE}/>
                        <EntityTable entities={value.entity.item} category={MobListEnum.ITEM}/>
                        <EntityTable entities={value.entity.misc} category={MobListEnum.MISC}/>
                        <EntityTable entities={value.entity.other} category={MobListEnum.OTHER}/>
                        <TypeCountTable entities={value.entityTypeCount}/>
                    </div>
                </>
            )}
        </WSSubscribe>
    );
}
