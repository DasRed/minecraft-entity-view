import WebSocketEventTypeEnum from '@/constant/WebSocketEventTypeEnum';
import GetEntitiesStatisticWebsocketClientHandler from '@/service/webSocketClientHandler/GetEntitiesStatistic';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import EventEmitter from 'eventemitter0';

interface WebSocketEventMap {
    [WebSocketEventTypeEnum.GET_ENTITIES_STATISTIC]: StatisticsInterface;

    // weitere Events hier:
    // [WebSocketEventTypeEnum.FOO]: FooPayload;
    // [WebSocketEventTypeEnum.BAR]: BarPayload;
}

type WebSocketMessage = {
    [K in keyof WebSocketEventMap]: {
        type: K;
        data: WebSocketEventMap[K];
    }
}[keyof WebSocketEventMap];


export default class WebSocketClient extends EventEmitter {
    private readonly host: string;
    private isConnected: boolean = false;
    // @ts-ignore
    private ws: WebSocket;

    constructor(host: string) {
        super({});

        this.host = host;
        this.connect();
    }

    private connect(): this {
        console.log('connecting websocket');
        this.ws = new WebSocket(this.host);

        this.ws.addEventListener('open', () => {
            console.log('websocket connected');
            this.isConnected = true;
        });
        this.ws.addEventListener('error', (event) => console.error(`WebSocket ${this.host} error`, event));
        this.ws.addEventListener('message', (event) => this.handleMessage(event));
        this.ws.addEventListener('close', () => {
            this.isConnected = false;
            console.log('connection closed');
            setTimeout(() => this.connect(), 1000);
        });

        return this;
    }

    private async handleMessage(event: MessageEvent) {
        try {
            const message: WebSocketMessage = JSON.parse(event.data);

            let data = message.data;
            if (message.type === WebSocketEventTypeEnum.GET_ENTITIES_STATISTIC) {
                data = (new GetEntitiesStatisticWebsocketClientHandler()).handle(data);
            }

            await this.emit(message.type, data);
        }
        catch (exception) {
            console.error(`WebSocket ${this.host} send invalid message`, exception, event);
        }
    }

    public send(type: WebSocketEventTypeEnum, data?: any): WebSocketClient {
        if (this.isConnected === true) {
            this.ws.send(JSON.stringify({type, data}));
        }

        return this;
    }
}