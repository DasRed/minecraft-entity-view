import MessageHandlerAbstract from '@/service/messageHandler/Abstract';
import WebSocketServerEventEnum from '@/service/webSocketServer/EventEnum';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import WebSocketMessageInterface from '@dasred/minecraft-entity-view-sdk/model/WebSocketMessageInterface';
import EventEmitter from 'node:events';
import {v4 as uuidv4} from 'uuid';
import {WebSocket, WebSocketServer as WSS} from 'ws';

export default class WebSocketServer extends EventEmitter {
    protected readonly clients: Record<string, WebSocket>;
    protected readonly messageHandlers: MessageHandlerAbstract[];
    protected readonly wss: WSS;

    constructor(port: number, messageHandlers: MessageHandlerAbstract[] = []) {
        super();

        this.wss             = new WSS({port});
        this.clients         = {};
        this.messageHandlers = messageHandlers;

        this.wss.on('connection', (ws: WebSocket) => this.handleConnect(ws));
    }

    public async close(): Promise<this> {
        return new Promise((resolve) => {
            this.wss.close(() => resolve(this));
        });
    }

    protected handleConnect(ws: WebSocket): this {
        const id         = uuidv4();
        this.clients[id] = ws;

        console.log(`new client with id ${id}.`);

        ws.on('message', (message) => {
            const data: WebSocketMessageInterface = JSON.parse(message.toString());

            this.messageHandlers.forEach(async (messageHandler) => {
                if (messageHandler.getType() !== data.type) {
                    return;
                }
                const result = await messageHandler.handle(ws, data.data);
                if (result !== null) {
                    this.sendTo(ws, result.type, result.data);
                }
            });
        });

        ws.on('close', () => {
            delete this.clients[id];
            console.log(`client with id ${id} removed.`);
        });

        this.emit(WebSocketServerEventEnum.CLIENT_CONNECTED, ws);

        return this;
    }

    public sendTo(ws: WebSocket, type: CommandType, data: unknown): this {
        ws.send(JSON.stringify({date: (new Date()).toISOString(), type, data} as WebSocketMessageInterface));

        return this;
    }

    public sendToAll(type: CommandType, data: unknown): this {
        Object.values(this.clients).forEach((ws) => this.sendTo(ws, type, data));

        return this;
    }
}
