import MobImages from '@/constant/MobImages';
import EntityItemInterface from '@dasred/minecraft-entity-view-sdk/model/EntityItemInterface';
import React from 'react';

interface EntityDisplayNameEnemyOptionInterface {
    entity: EntityItemInterface;
}

export default function EntityDisplayNameOther({entity}: EntityDisplayNameEnemyOptionInterface): React.ReactElement {
    return (
        <>
            {MobImages[entity.type] && <img src={MobImages[entity.type].replace('{size}', '16x16')} className="w-4 h-4 mr-1" alt=""/>}
            {MobImages[entity.type] === undefined && <div className="w-4 h-4 mr-1 bg-amber-400/50"/>}
            {entity.customName ?? entity.name}
        </>
    );
}