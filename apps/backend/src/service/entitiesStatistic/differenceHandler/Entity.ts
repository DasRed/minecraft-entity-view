import DifferenceHandlerObjectListAbstract from '@/service/differenceHandler/ObjectListAbstract';
import WebSocketServer from '@/service/WebSocketServer';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import StatisticEntityListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityListInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';

export default class EntitiesStatisticDifferenceHandlerEntity extends DifferenceHandlerObjectListAbstract {
    private key: MobCategoryEnum;

    constructor(wss: WebSocketServer, key: MobCategoryEnum) {
        super(wss, CommandEnum.STATISTIC_PATCH_ENTITIES_LIST(key), CommandEnum.STATISTIC_PATCH_ENTITIES_ID);
        this.key = key;
    }

    protected getObjectListFromData(data: StatisticsInterface): StatisticEntityListInterface {
        return data.entity[this.key];
    }
}
