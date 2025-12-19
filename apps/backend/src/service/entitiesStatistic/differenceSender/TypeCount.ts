import objectDeepDifference from '@/lib/objectDeepDifference';
import EntitiesStatisticDifferenceSenderBase from '@/service/entitiesStatistic/differenceSender/Base';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import StatisticTypeCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/TypeCountInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import StatisticTypeCountListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticTypeCountListInterface';
import WebsocketPatchObjectList from '@dasred/minecraft-entity-view-sdk/model/WebsocketPatchObjectList';
import {flatten} from 'flat';
import {difference, intersection, isEmpty} from 'lodash-es';

export default class EntitiesStatisticDifferenceSenderTypeCount extends EntitiesStatisticDifferenceSenderBase {
    public handle(dataBefore: StatisticsInterface, dataAfter: StatisticsInterface): void {
        const entriesBefore = Object.keys(dataBefore.entityTypeCount);
        const entriesAfter  = Object.keys(dataAfter.entityTypeCount);

        const entriesAdded   = difference(entriesAfter, entriesBefore);
        const entriesDeleted = difference(entriesBefore, entriesAfter);
        if (entriesAdded.length !== 0 || entriesDeleted.length !== 0) {
            this.send(CommandEnum.STATISTIC_PATCH_TYPE_COUNT_LIST, {
                ids:    entriesAfter,
                add:    entriesAdded.reduce((acc, id) => {
                    acc[id] = dataAfter.entityTypeCount[id];
                    return acc;
                }, {} as StatisticTypeCountListInterface),
                remove: entriesDeleted,
            } as WebsocketPatchObjectList<StatisticTypeCountInterface>);
        }

        // test for update for one entry
        intersection(entriesBefore, entriesAfter).forEach((id) => {
            const entryBefore = dataBefore.entityTypeCount[id];
            const entryAfter  = dataAfter.entityTypeCount[id];

            const diff = objectDeepDifference(entryAfter, entryBefore);
            if (isEmpty(diff) === false) {
                this.send(CommandEnum.STATISTIC_PATCH_TYPE_COUNT_ID(id), flatten(diff));
            }
        });
    }
}