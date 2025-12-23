import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';

type Callback = (type: CommandType, data: any) => void;

interface WebSocketMessageInterface {
    data: any;
    type: string;
}

export default class WebSocketClient {
    private callbacks              = new Set<Callback>();
    private closedByClose: boolean = false;
    private readonly host: string;
    private ws!: WebSocket;

    constructor(host: string) {
        this.host = host;
        this.connect();
    }

    public close(): this {
        this.callbacks.clear();
        this.closedByClose = true;
        this.ws.close();

        return this;
    }

    private connect(): this {
        console.log('connecting websocket', this.host);
        this.ws = new WebSocket(this.host);

        this.ws.addEventListener('open', () => console.log('websocket connected'));
        this.ws.addEventListener('error', (event) => console.error(`WebSocket ${this.host} error`, event));
        this.ws.addEventListener('message', (event) => this.handleMessage(event));
        this.ws.addEventListener('close', () => {
            if (this.closedByClose) {
                this.closedByClose = false;
                console.log('connection closed.');
            }
            else {
                console.log('connection closed by error, reconnecting...');
                setTimeout(() => this.connect(), 1000);
            }
        });

        return this;
    }

    private async handleMessage(event: MessageEvent) {
        try {
            const message: WebSocketMessageInterface = JSON.parse(event.data);
            this.callbacks.forEach((callback) => callback(message.type, message.data));
        }
        catch (exception) {
            console.error(`WebSocket ${this.host} send invalid message`, exception, event);
        }
    }

    public register(callback: Callback): this {
        this.callbacks.add(callback);

        return this;
    }

    public send(type: CommandType, data: unknown): this {
        this.ws.send(JSON.stringify({type, data, date: new Date()} as WebSocketMessageInterface));

        return this;
    }
}