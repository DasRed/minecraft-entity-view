import DifferenceSenderBase from '@/service/differenceSender/Base';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';

export default class DifferenceSenderCount extends DifferenceSenderBase {
    public handle(dataBefore: StatisticsInterface, dataAfter: StatisticsInterface): void {
        // total
        if (dataAfter.count.total !== dataBefore.count.total) {
            this.send(CommandEnum.UPDATE_COUNT_TOTAL, dataAfter.count.total);
        }

        // mobs
        Object.values(MobCategoryEnum).forEach((category) => {
            const valueAfter  = dataAfter.count.mobCategory[category];
            const valueBefore = dataBefore.count.mobCategory[category];
            if (valueAfter !== valueBefore) {
                this.send(CommandEnum.UPDATE_COUNT_MOB(category), valueAfter);
            }
        });
    }
}