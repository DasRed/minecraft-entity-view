'use client';

import EntityTable from '@/component/entity/Table';
import EntitySummary from '@/component/EntitySummary';
import TypeCountTable from '@/component/typeCount/Table';
import WSSubscribe from '@/component/WSSubscribe';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
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
                        <EntityTable entities={value.entity.monster} category={MobCategoryEnum.MONSTER} listKey={MobListEnum.MONSTER}/>
                        <EntityTable entities={value.entity.creature} category={MobCategoryEnum.CREATURE} listKey={MobListEnum.CREATURE}/>
                        <EntityTable entities={value.entity.item} category={MobCategoryEnum.ITEM} listKey={MobListEnum.ITEM}/>
                        <EntityTable entities={value.entity.misc} category={MobCategoryEnum.MISC} listKey={MobListEnum.MISC}/>
                        <EntityTable entities={value.entity.other} title="Other" command={CommandEnum.UPDATE_COUNT_MOB_OTHER} listKey={MobListEnum.OTHER}/>
                        <TypeCountTable entities={value.entityTypeCount}/>
                    </div>
                </>
            )}
        </WSSubscribe>
    );
}
