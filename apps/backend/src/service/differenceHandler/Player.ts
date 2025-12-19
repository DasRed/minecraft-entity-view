import DifferenceHandlerObjectListAbstract from '@/service/differenceHandler/ObjectListAbstract';
import WebSocketServer from '@/service/WebSocketServer';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import APIPlayerInterface from '@dasred/minecraft-entity-view-sdk/model/api/players/PlayerInterface';
import APIPlayersInterface from '@dasred/minecraft-entity-view-sdk/model/api/PlayersInterface';

export default class DifferenceHandlerPlayer extends DifferenceHandlerObjectListAbstract {
    constructor(wss: WebSocketServer) {
        super(wss, CommandEnum.PLAYERS_PATCH_LIST, CommandEnum.PLAYERS_PATCH_ID);
    }

    protected getObjectListFromData(data: APIPlayersInterface): Record<string, APIPlayerInterface> {
        return data.players;
    }
}