import StatisticCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/CountInterface';
import StatisticMobListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticMobListInterface';
import StatisticTypeCountListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticTypeCountListInterface';

interface StatisticsInterface {
    count: StatisticCountInterface;
    entity: StatisticMobListInterface;
    entityTypeCount: StatisticTypeCountListInterface;
}

export default StatisticsInterface;