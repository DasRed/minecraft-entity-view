import MobImages from '@/constant/MobImages';
import EntityItemInterface from '@dasred/minecraft-entity-view-sdk/model/EntityItemInterface';
import React from 'react';

interface EntityDisplayNameBlockDisplayOptionInterface {
    entity: EntityItemInterface;
}

export default function EntityDisplayNameBlockDisplay({entity}: EntityDisplayNameBlockDisplayOptionInterface): React.ReactElement {
    let name = entity.name;
    if (entity.tags.includes('portals.block_display.portal.nether_portal')) {
        name = 'Nether Portal Block';
    }

    return (
        <>
            {MobImages[entity.type] && <img src={MobImages[entity.type].replace('{size}', '16x16')} className="w-4 h-4 mr-1" alt=""/>}
            {MobImages[entity.type] === undefined && <div className="w-4 h-4 mr-1 bg-amber-400/50"/>}
            {name}
        </>
    );
}