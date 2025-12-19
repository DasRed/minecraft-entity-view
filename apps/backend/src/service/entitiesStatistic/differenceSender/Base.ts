import WebSocketServer from '@/service/WebSocketServer';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';

export default abstract class EntitiesStatisticDifferenceSenderBase {
    protected wss: WebSocketServer;

    constructor(wss: WebSocketServer) {
        this.wss = wss;
    }

    public abstract handle(dataBefore: StatisticsInterface, dataAfter: StatisticsInterface): void;

    protected send(type: string, data: any): this {
        this.wss.sendToAll(type, data);

        return this;
    }
}