import DifferenceSenderBase from '@/service/differenceSender/Base';
import SummaryConfig from '@dasred/minecraft-entity-view-sdk/constant/SummaryConfig';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';

export default class DifferenceSenderSummary extends DifferenceSenderBase {
    public handle(dataBefore: StatisticsInterface, dataAfter: StatisticsInterface): void {
        SummaryConfig.forEach((summaryConfig) => {
            const valueAfter  = summaryConfig.get(dataAfter.count);
            const valueBefore = summaryConfig.get(dataBefore.count);

            if (valueAfter !== valueBefore) {
                this.send(summaryConfig.command, valueAfter);
            }
        });
    }
}