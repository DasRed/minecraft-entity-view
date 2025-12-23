import MessageHandlerAbstract from '@/service/messageHandler/Abstract';
import RConSender from '@/service/RConSender';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
import APIEntityInterface from '@dasred/minecraft-entity-view-sdk/model/api/EntityInterface';
import WebSocketMessageResponseInterface from '@dasred/minecraft-entity-view-sdk/model/WebSocketMessageResponseInterface';
import WebSocket from 'ws';

export default class MessageHandlerEntityKill extends MessageHandlerAbstract {
    protected rcon: RConSender;

    constructor(rcon: RConSender) {
        super();

        this.rcon = rcon;
    }

    public getType(): string {
        return CommandEnum.KILL_ENTITY;
    }

    public async handle(ws: WebSocket, entity: APIEntityInterface): Promise<WebSocketMessageResponseInterface<boolean>> {
        if (entity.displayType === EntityTypeEnum.PLAYER) {
            console.log('Entity kill for player is not allowed.');
            return {type: CommandEnum.KILL_ENTITY_RESPONSE(entity.uuid), data: false};
        }

        const result = await this.rcon.send(`kill ${entity.uuid}`);
        console.log(`Entity killed: ${result}`, entity.uuid, entity.x, entity.y, entity.z);

        return {type: CommandEnum.KILL_ENTITY_RESPONSE(entity.uuid), data: true};
    }
}