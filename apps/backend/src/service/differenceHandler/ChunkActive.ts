import DifferenceHandlerObjectListAbstract from '@/service/differenceHandler/ObjectListAbstract';
import WebSocketServer from '@/service/WebSocketServer';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import APIChunkListInterface from '@dasred/minecraft-entity-view-sdk/model/api/ChunkListInterface';

export default class DifferenceHandlerChunkActive extends DifferenceHandlerObjectListAbstract {
    constructor(wss: WebSocketServer) {
        super(wss, CommandEnum.CHUNKS_ACTIVE_LIST, CommandEnum.CHUNKS_ACTIVE_ID);
    }

    protected getObjectListFromData(data: APIChunkListInterface): APIChunkListInterface {
        return data;
    }
}