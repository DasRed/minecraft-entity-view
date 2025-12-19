import objectDeepDifference from '@/lib/objectDeepDifference';
import DifferenceHandlerAbstract from '@/service/differenceHandler/Abstract';
import WebSocketServer from '@/service/WebSocketServer';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import WebsocketPatchObjectList from '@dasred/minecraft-entity-view-sdk/model/WebsocketPatchObjectList';
import {flatten} from 'flat';
import {difference, intersection, isEmpty} from 'lodash-es';

export default abstract class DifferenceHandlerObjectListAbstract extends DifferenceHandlerAbstract {
    protected commandPatchKey: (key: string) => CommandType;
    protected commandPatchList: CommandType;

    constructor(wss: WebSocketServer, commandPatchList: CommandType, commandPatchKey: (key: string) => CommandType) {
        super(wss);

        this.commandPatchList = commandPatchList;
        this.commandPatchKey  = commandPatchKey;
    }

    protected abstract getObjectListFromData(data: unknown): Record<string, unknown>;

    public handle(dataBefore: unknown, dataAfter: unknown): void {
        const objectListBefore = this.getObjectListFromData(dataBefore);
        const objectListAfter  = this.getObjectListFromData(dataAfter);

        const keysBefore = Object.keys(objectListBefore);
        const keysAfter  = Object.keys(objectListAfter);

        const keysAdded   = difference(keysAfter, keysBefore);
        const keysDeleted = difference(keysBefore, keysAfter);

        if (keysAdded.length !== 0 || keysDeleted.length !== 0) {
            this.send(this.commandPatchList, {
                ids:    keysAfter,
                add:    keysAdded.reduce((acc, id) => {
                    acc[id] = objectListAfter[id];
                    return acc;
                }, {} as Record<string, unknown>),
                remove: keysDeleted,
            } as WebsocketPatchObjectList<unknown>);
        }

        // test for update for one entry
        intersection(keysBefore, keysAfter).forEach((id) => {
            const entryBefore = objectListBefore[id];
            const entryAfter  = objectListAfter[id];

            const diff = objectDeepDifference(entryAfter, entryBefore);
            if (isEmpty(diff) === false) {
                this.send(this.commandPatchKey(id), flatten(diff));
            }
        });
    }
}