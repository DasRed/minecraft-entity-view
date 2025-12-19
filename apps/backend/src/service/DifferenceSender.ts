import EntitiesStatisticDifferenceSenderBase from '@/service/entitiesStatistic/differenceSender/Base';
import EntitiesStatisticUpdater from '@/service/updater/EntitiesStatistic';
import EntitiesStatisticUpdaterEventEnum from '@/service/entitiesStatistic/EventEnum';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';

export default class DifferenceSender {
    private esu: EntitiesStatisticUpdater;
    private handler: EntitiesStatisticDifferenceSenderBase[];

    constructor(esu: EntitiesStatisticUpdater, handler: EntitiesStatisticDifferenceSenderBase[]) {
        this.esu     = esu;
        this.handler = handler;
    }

    protected handle(dataAfter: StatisticsInterface, dataBefore: StatisticsInterface): this {
        this.handler.forEach((handler) => handler.handle(dataBefore, dataAfter));

        return this;
    }

    public start(): this {
        this.esu.on(EntitiesStatisticUpdaterEventEnum.UPDATE, (data, dataBefore) => this.handle(data, dataBefore));

        return this;
    }
}