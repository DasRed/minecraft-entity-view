import WebSocketMessageResponseInterface from '@dasred/minecraft-entity-view-sdk/model/WebSocketMessageResponseInterface';
import {WebSocket} from 'ws';

export default abstract class MessageHandlerAbstract {
    public abstract getType(): string;

    public abstract handle(ws: WebSocket, data: unknown): Promise<WebSocketMessageResponseInterface | null>;
}