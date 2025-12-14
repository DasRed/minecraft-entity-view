import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';

interface StatisticCountInterface {
    total: number;
    active: number;
    mobCategory: Record<MobCategoryEnum, number> & {other: number};
}

export default StatisticCountInterface;