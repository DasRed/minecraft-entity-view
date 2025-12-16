import DifferenceSenderBase from '@/service/differenceSender/Base';
import SummaryConfig from '@dasred/minecraft-entity-view-sdk/constant/SummaryConfig';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {difference} from 'lodash-es';

export default class DifferenceSenderCountAndHistory extends DifferenceSenderBase {
    public handle(dataBefore: StatisticsInterface, dataAfter: StatisticsInterface): void {
        SummaryConfig.forEach((summaryConfig) => {
            const valueAfter  = summaryConfig.get(dataAfter.count);
            const valueBefore = summaryConfig.get(dataBefore.count);

            if (valueAfter !== valueBefore) {
                this.send(summaryConfig.commandValue, valueAfter);
            }

            // send update for history
            const historyAfter  = summaryConfig.get(dataAfter.count.history);
            const historyBefore = summaryConfig.get(dataBefore.count.history);

            const diff = difference(historyAfter, historyBefore);
            if (diff.length !== 0) {
                this.send(summaryConfig.commandHistory, historyAfter);
            }
        });
    }
}