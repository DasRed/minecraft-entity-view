import WebSocketServerEventEnum from '@/service/webSocketServer/EventEnum';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import WebSocketMessageInterface from '@dasred/minecraft-entity-view-sdk/model/WebSocketMessageInterface';
import EventEmitter from 'node:events';
import {v4 as uuidv4} from 'uuid';
import {WebSocket, WebSocketServer as WSS} from 'ws';

export default class WebSocketServer extends EventEmitter {
    protected readonly clients: Record<string, WebSocket>;
    protected readonly wss: WSS;

    constructor(port: number) {
        super();

        this.wss     = new WSS({port});
        this.clients = {};

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

        ws.on('message', async (message) => {
            console.log(`message from client ${id}`, message.toString());
            this.emit(WebSocketServerEventEnum.CLIENT_MESSAGE, message.toString());
        });

        ws.on('close', () => {
            delete this.clients[id];
            console.log(`client with id ${id} removed.`);
            this.emit(WebSocketServerEventEnum.CLIENT_DISCONNECTED, ws);
        });

        this.emit(WebSocketServerEventEnum.CLIENT_CONNECTED, ws);

        return this;
    }

    public sendTo(ws: WebSocket, type: CommandType, data: any): this {
        ws.send(JSON.stringify({date: (new Date()).toISOString(), type, data} as WebSocketMessageInterface));

        return this;
    }

    public sendToAll(type: CommandType, data: any): this {
        Object.values(this.clients).forEach((ws) => this.sendTo(ws, type, data));

        return this;
    }
}
