import DifferenceSenderBase from '@/service/differenceSender/Base';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {difference} from 'lodash-es';

export default class DifferenceSenderHistory extends DifferenceSenderBase {
    public handle(dataBefore: StatisticsInterface, dataAfter: StatisticsInterface): void {
        const diff = difference(dataAfter.count.history.mobCategory.timestamp, dataBefore.count.history.mobCategory.timestamp);
        if (diff.length !== 0) {
            this.send(CommandEnum.UPDATE_COUNT_HISTORY_MOB, [
                dataAfter.count.history.mobCategory.timestamp,
                dataAfter.count.history.mobCategory.monster,
                dataAfter.count.history.mobCategory.creature,
                dataAfter.count.history.mobCategory.item,
                dataAfter.count.history.mobCategory.misc,
                dataAfter.count.history.mobCategory.other,
            ]);
        }
    }
}