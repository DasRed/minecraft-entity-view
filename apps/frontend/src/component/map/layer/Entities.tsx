import MapMarkerEntityEntityEntry from '@/component/map/marker/entity/EntityEntry';
import useWSSObjectListPatch from '@/hook/useWSSObjectListPatch';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
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
    const entities = useWSSObjectListPatch<StatisticEntityInterface>(statistic.entity[category], CommandEnum.STATISTIC_PATCH_ENTITIES_LIST(category));

    return (
        <div className="hidden">
            {entities.map((entity) => entity.displayType !== EntityTypeEnum.PLAYER && <MapMarkerEntityEntityEntry key={entity.uuid} entity={entity} visible={visible}/>)}
        </div>
    );
}