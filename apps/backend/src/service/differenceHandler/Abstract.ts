import WebSocketServer from '@/service/WebSocketServer';

export default abstract class DifferenceHandlerAbstract {
    protected wss: WebSocketServer;

    constructor(wss: WebSocketServer) {
        this.wss = wss;
    }

    public abstract handle(dataBefore: unknown, dataAfter: unknown): void;

    protected send(type: string, data: unknown): this {
        this.wss.sendToAll(type, data);

        return this;
    }
}