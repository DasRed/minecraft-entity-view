import DifferenceSenderBase from '@/service/differenceSender/Base';
import DifferenceSenderEntity from '@/service/differenceSender/Entity';
import DifferenceSenderEntityTypeCountEntries from '@/service/differenceSender/EntityTypeCountEntries';
import DifferenceSenderSummary from '@/service/differenceSender/Summary';
import EntitiesStatisticUpdater from '@/service/EntitiesStatisticUpdater';
import EntitiesStatisticUpdaterEventEnum from '@/service/entitiesStatisticUpdater/EventEnum';
import WebSocketServer from '@/service/WebSocketServer';
import MobListEnum from '@dasred/minecraft-entity-view-sdk/constant/MobListEnum';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';

export default class DifferenceSenderHandler {
    private esu: EntitiesStatisticUpdater;
    private handler: DifferenceSenderBase[];

    constructor(esu: EntitiesStatisticUpdater, wss: WebSocketServer) {
        this.esu = esu;

        this.esu.on(EntitiesStatisticUpdaterEventEnum.UPDATE, (data, dataBefore) => this.handle(data, dataBefore));

        this.handler = [
            new DifferenceSenderSummary(wss),
            new DifferenceSenderEntityTypeCountEntries(wss),
            ...Object.values(MobListEnum).map((key) => new DifferenceSenderEntity(wss, key))
        ];
    }

    protected handle(dataAfter: StatisticsInterface, dataBefore: StatisticsInterface) {
        this.handler.forEach((handler) => handler.handle(dataBefore, dataAfter));
    }
}