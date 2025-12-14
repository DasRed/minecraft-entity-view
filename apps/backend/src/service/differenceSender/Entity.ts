import objectDeepDifference from '@/lib/objectDeepDifference';
import DifferenceSenderBase from '@/service/differenceSender/Base';
import WebSocketServer from '@/service/WebSocketServer';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobListEnum from '@dasred/minecraft-entity-view-sdk/constant/MobListEnum';
import StatisticEntityListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityListInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {flatten} from 'flat';
import {difference, intersection, isEmpty} from 'lodash-es';

export default class DifferenceSenderEntity extends DifferenceSenderBase {
    private key: MobListEnum;

    constructor(wss: WebSocketServer, key: MobListEnum) {
        super(wss);
        this.key = key;
    }

    public handle(dataBefore: StatisticsInterface, dataAfter: StatisticsInterface): void {
        const entriesBefore = Object.keys(dataBefore.entity[this.key]);
        const entriesAfter  = Object.keys(dataAfter.entity[this.key]);

        const entriesAdded   = difference(entriesAfter, entriesBefore);
        const entriesDeleted = difference(entriesBefore, entriesAfter);
        if (entriesAdded.length !== 0 || entriesDeleted.length !== 0) {
            this.send(CommandEnum.UPDATE_ENTITY_MODIFY(this.key), {
                add:    entriesAdded.reduce((acc, id) => {
                    acc[id] = dataAfter.entity[this.key][id];
                    return acc;
                }, {} as StatisticEntityListInterface),
                remove: entriesDeleted,
            });
        }

        // test for update for one entry
        intersection(entriesBefore, entriesAfter).forEach((id) => {
            const entryBefore = dataBefore.entity[this.key][id];
            const entryAfter  = dataAfter.entity[this.key][id];

            const diff = objectDeepDifference(entryAfter, entryBefore);
            if (isEmpty(diff) === false) {
                this.send(CommandEnum.UPDATE_ENTITY_PATCH_ID(this.key, id), flatten(diff));
            }
        });
    }
}
