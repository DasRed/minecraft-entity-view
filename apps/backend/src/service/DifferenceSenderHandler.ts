import DifferenceSenderBase from '@/service/differenceSender/Base';
import DifferenceSenderCountAndHistory from '@/service/differenceSender/CountAndHistory';
import DifferenceSenderEntity from '@/service/differenceSender/Entity';
import DifferenceSenderTypeCount from '@/service/differenceSender/TypeCount';
import EntitiesStatisticUpdater from '@/service/EntitiesStatisticUpdater';
import EntitiesStatisticUpdaterEventEnum from '@/service/entitiesStatisticUpdater/EventEnum';
import WebSocketServer from '@/service/WebSocketServer';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';

export default class DifferenceSenderHandler {
    private esu: EntitiesStatisticUpdater;
    private handler: DifferenceSenderBase[];

    constructor(esu: EntitiesStatisticUpdater, wss: WebSocketServer) {
        this.esu = esu;

        this.esu.on(EntitiesStatisticUpdaterEventEnum.UPDATE, (data, dataBefore) => this.handle(data, dataBefore));

        this.handler = [
            new DifferenceSenderCountAndHistory(wss),
            new DifferenceSenderTypeCount(wss),
            ...Object.values(MobCategoryEnum).map((key) => new DifferenceSenderEntity(wss, key)),
        ];
    }

    protected handle(dataAfter: StatisticsInterface, dataBefore: StatisticsInterface) {
        this.handler.forEach((handler) => handler.handle(dataBefore, dataAfter));
    }
}