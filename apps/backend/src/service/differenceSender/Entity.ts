import objectDeepDifference from '@/lib/objectDeepDifference';
import DifferenceSenderBase from '@/service/differenceSender/Base';
import WebSocketServer from '@/service/WebSocketServer';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import StatisticEntityListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityListInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import WS_PATCH_OBJECT_LIST from '@dasred/minecraft-entity-view-sdk/model/WS_PATCH_OBJECT_LIST';
import {flatten} from 'flat';
import {difference, intersection, isEmpty} from 'lodash-es';

export default class DifferenceSenderEntity extends DifferenceSenderBase {
    private key: MobCategoryEnum;

    constructor(wss: WebSocketServer, key: MobCategoryEnum) {
        super(wss);
        this.key = key;
    }

    public handle(dataBefore: StatisticsInterface, dataAfter: StatisticsInterface): void {
        const entriesBefore = Object.keys(dataBefore.entity[this.key]);
        const entriesAfter  = Object.keys(dataAfter.entity[this.key]);

        const entriesAdded   = difference(entriesAfter, entriesBefore);
        const entriesDeleted = difference(entriesBefore, entriesAfter);
        if (entriesAdded.length !== 0 || entriesDeleted.length !== 0) {
            this.send(CommandEnum.PATCH_ENTITIES_LIST(this.key), {
                ids:    entriesAfter,
                add:    entriesAdded.reduce((acc, id) => {
                    acc[id] = dataAfter.entity[this.key][id];
                    return acc;
                }, {} as StatisticEntityListInterface),
                remove: entriesDeleted,
            } as WS_PATCH_OBJECT_LIST<StatisticEntityInterface>);
        }

        // test for update for one entry
        intersection(entriesBefore, entriesAfter).forEach((id) => {
            const entryBefore = dataBefore.entity[this.key][id];
            const entryAfter  = dataAfter.entity[this.key][id];

            const diff = objectDeepDifference(entryAfter, entryBefore);
            if (isEmpty(diff) === false) {
                this.send(CommandEnum.PATCH_ENTITIES_ID(id), flatten(diff));
            }
        });
    }
}
