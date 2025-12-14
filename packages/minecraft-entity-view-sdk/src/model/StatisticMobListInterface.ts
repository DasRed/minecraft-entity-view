import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import StatisticEntityListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityListInterface';

type StatisticMobListInterface = Record<MobCategoryEnum, StatisticEntityListInterface>;

export default StatisticMobListInterface;
