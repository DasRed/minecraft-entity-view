import MobListEnum from '@dasred/minecraft-entity-view-sdk/constant/MobListEnum';
import StatisticEntityListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityListInterface';

type StatisticMobListInterface = Record<MobListEnum, StatisticEntityListInterface>;

export default StatisticMobListInterface;
