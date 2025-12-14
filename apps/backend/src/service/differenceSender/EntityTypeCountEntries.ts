import objectDeepDifference from '@/lib/objectDeepDifference';
import DifferenceSenderBase from '@/service/differenceSender/Base';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import StatisticTypeCountListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticTypeCountListInterface';
import {flatten} from 'flat';
import {difference, intersection, isEmpty} from 'lodash-es';

export default class DifferenceSenderEntityTypeCountEntries extends DifferenceSenderBase {
    public handle(dataBefore: StatisticsInterface, dataAfter: StatisticsInterface): void {
        const entriesBefore = Object.keys(dataBefore.entityTypeCount);
        const entriesAfter  = Object.keys(dataAfter.entityTypeCount);

        const entriesAdded = difference(entriesAfter, entriesBefore);
        const entriesDeleted = difference(entriesBefore, entriesAfter);
        if (entriesAdded.length !== 0 || entriesDeleted.length !== 0) {
            this.send(CommandEnum.UPDATE_ENTITY_TYPE_COUNT_ENTRIES_MODIFY, {
                add: entriesAdded.reduce((acc, id) => {
                    acc[id] = dataAfter.entityTypeCount[id];
                    return acc;
                }, {} as StatisticTypeCountListInterface),
                remove: entriesDeleted
            });
        }

        // test for update for one entry
        intersection(entriesBefore, entriesAfter).forEach((id) => {
            const entryBefore = dataBefore.entityTypeCount[id];
            const entryAfter  = dataAfter.entityTypeCount[id];

            const diff = objectDeepDifference(entryAfter, entryBefore);
            if (isEmpty(diff) === false) {
                this.send(CommandEnum.UPDATE_ENTITY_TYPE_COUNT_ENTRIES_PATCH_ID(id), flatten(diff));
            }
        });
    }
}