import MapMarkerEntityPlayerEntry from '@/component/map/marker/entity/PlayerEntry';
import useWSSObjectListPatch from '@/hook/useWSSObjectListPatch';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import APIPlayerInterface from '@dasred/minecraft-entity-view-sdk/model/api/players/PlayerInterface';
import APIPlayersInterface from '@dasred/minecraft-entity-view-sdk/model/api/PlayersInterface';
import {ReactElement} from 'react';

interface MapLayerSpawnOptionsInterface {
    players: APIPlayersInterface;
    visible: boolean;
}

export default function MapLayerPlayers({players: playersInitial, visible}: MapLayerSpawnOptionsInterface): ReactElement | null {
    const players = useWSSObjectListPatch<APIPlayerInterface>(playersInitial.players, CommandEnum.PLAYERS_PATCH_LIST);

    return (
        <div className="hidden">
            {players.map((player) => <MapMarkerEntityPlayerEntry key={player.uuid} visible={visible} player={player}/>)}
        </div>
    );
}