import MobImages from '@/constant/MobImages';
import EntityItemInterface from '@dasred/minecraft-entity-view-sdk/model/EntityItemInterface';
import React from 'react';

interface EntityDisplayNameItemOptionInterface {
    entity: EntityItemInterface;
}

export default function EntityDisplayNameItem({entity}: EntityDisplayNameItemOptionInterface): React.ReactElement {
    return (
        <>
            {MobImages[entity.item.type] && <img src={MobImages[entity.item.type].replace('{size}', '16x16')} className="w-4 h-4 mr-1" alt=""/>}
            {MobImages[entity.item.type] === undefined && <div className="w-4 h-4 mr-1 bg-amber-400/50"/>}
            {entity.item.count}x {entity.item.name}
        </>
    );
}