import useLayerGroup from '@/component/map/hook/useLayerGroup';
import MapMarkerEntityEntry from '@/component/map/marker/EntityEntry';
import useWSSObjectListPatch from '@/hook/useWSSObjectListPatch';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {ReactElement} from 'react';

interface MapLayerEntitiesOptionsInterface {
    statistic: StatisticsInterface;
    category: MobCategoryEnum;
    visible: boolean;
}

export default function MapLayerEntities({statistic, category, visible}: MapLayerEntitiesOptionsInterface): ReactElement {
    const entities   = useWSSObjectListPatch<StatisticEntityInterface>(statistic.entity[category], CommandEnum.STATISTIC_PATCH_ENTITIES_LIST(category));
    const layerGroup = useLayerGroup(visible);

    return (
        <div className="hidden">
            {entities.map((entity) => <MapMarkerEntityEntry key={entity.uuid} entity={entity} layerGroup={layerGroup}/>)}
        </div>
    );
}