import DifferenceSenderBase from '@/service/differenceSender/Base';
import EntitiesStatisticUpdater from '@/service/EntitiesStatisticUpdater';
import EntitiesStatisticUpdaterEventEnum from '@/service/entitiesStatisticUpdater/EventEnum';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';

export default class DifferenceSenderHandler {
    private esu: EntitiesStatisticUpdater;
    private handler: DifferenceSenderBase[];

    constructor(esu: EntitiesStatisticUpdater, handler: DifferenceSenderBase[]) {
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