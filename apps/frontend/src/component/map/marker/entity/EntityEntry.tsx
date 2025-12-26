import MapMarkerEntityEntry from '@/component/map/marker/EntityEntry';
import useWSSPatch from '@/hook/useWSSPatch';
import useWSSSend from '@/hook/useWSSSend';
import getMobImageByType from '@/lib/getMobImageByType';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import {Marker} from 'leaflet';
import {ReactElement} from 'react';

interface MapMarkerEntityEntryOptionsInterface {
    entity: StatisticEntityInterface;
    visible: boolean;
}

export default function MapMarkerEntityEntityEntry({entity: entityInitial, visible}: MapMarkerEntityEntryOptionsInterface): ReactElement {
    const wssSend = useWSSSend();
    const entity  = useWSSPatch<StatisticEntityInterface>(entityInitial, CommandEnum.STATISTIC_PATCH_ENTITIES_ID(entityInitial.uuid));

    return (
        <MapMarkerEntityEntry
            uuid={entity.uuid}
            type={entity.displayType}
            name={entity.customName ?? entity.displayName}
            dimension={entity.dimension}
            x={entity.x}
            y={entity.y}
            z={entity.z}
            image={getMobImageByType(entity.displayType)}
            bornAtTimestamp={entityInitial.born.at.timestamp}
            visible={visible}
            isDeleted={entity.stats.isDeleted}
            onClickKill={() => wssSend(CommandEnum.KILL_ENTITY, entity)}
            markerConstructor={Marker}
        />
    );
}