import EventEmitter from 'eventemitter0';

interface WebSocketMessageInterface {
    data: any;
    type: string;
}

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
            const message: WebSocketMessageInterface = JSON.parse(event.data);
            await this.emit(message.type, message.data);
        }
        catch (exception) {
            console.error(`WebSocket ${this.host} send invalid message`, exception, event);
        }
    }
}