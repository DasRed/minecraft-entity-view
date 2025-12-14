import TypeCountEntry from '@/component/typeCount/Entry';
import WSSubscribe from '@/component/WSSubscribe';
import useWSSListModify from '@/hook/useWSSListModify';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import StatisticTypeCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/TypeCountInterface';
import StatisticTypeCountListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticTypeCountListInterface';
import {set} from 'lodash-es';
import {ReactElement} from 'react';

interface EntitiesCountTableOptionsInterface {
    entities: StatisticTypeCountListInterface;
}

export default function TypeCountTable({entities: entitiesInitial}: EntitiesCountTableOptionsInterface): ReactElement {
    const {entities} = useWSSListModify<StatisticTypeCountInterface>(entitiesInitial, CommandEnum.UPDATE_ENTITY_TYPE_COUNT_ENTRIES_MODIFY);

    return (
        <div>
            <h2 className="font-extrabold text-xl">Entities Type Count</h2>
            <div className="flex flex-col-reverse text-sm">
                <div className="flex flex-row w-full font-bold border-b border-default order-last">
                    <span className="w-3/4">Type</span>
                    <span className="w-1/4 text-right">Count</span>
                </div>

                {entities.map((entity) => (
                    <WSSubscribe key={entity.type} command={CommandEnum.UPDATE_ENTITY_TYPE_COUNT_ENTRIES_PATCH_ID(entity.type)} initial={entity}>
                        {(entityDiff, entity) => {
                            Object.entries(entityDiff).forEach(([path, value]) => set(entity, path, value));
                            return <TypeCountEntry entity={entity}/>;
                        }}
                    </WSSubscribe>
                ))}
            </div>
        </div>
    );
}