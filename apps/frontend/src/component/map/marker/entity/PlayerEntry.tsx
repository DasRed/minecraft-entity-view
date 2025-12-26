import MapMarkerEntityEntry from '@/component/map/marker/EntityEntry';
import useWSSPatch from '@/hook/useWSSPatch';
import MapMarkerPlayer from '@/service/map/MarkerPlayer';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
import APIPlayerInterface from '@dasred/minecraft-entity-view-sdk/model/api/players/PlayerInterface';
import {ReactElement} from 'react';

interface MapMarkerPlayerEntryOptionsInterface {
    player: APIPlayerInterface;
    visible: boolean;
}

export default function MapMarkerEntityPlayerEntry({player: entityInitial, visible}: MapMarkerPlayerEntryOptionsInterface): ReactElement {
    const entity = useWSSPatch<APIPlayerInterface>(entityInitial, CommandEnum.PLAYERS_PATCH_ID(entityInitial.uuid));

    return (
        <MapMarkerEntityEntry
            uuid={entity.uuid}
            type={EntityTypeEnum.PLAYER}
            name={entity.name}
            dimension={entity.dimension}
            x={entity.x}
            y={entity.y}
            z={entity.z}
            yHeadRot={entity.yHeadRot}
            image={`https://mc-heads.net/avatar/${entity.uuid}/100`}
            visible={visible}
            markerConstructor={MapMarkerPlayer}
        />
    );
}