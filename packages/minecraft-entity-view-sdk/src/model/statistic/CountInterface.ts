import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import HistoryCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountInterface';

interface StatisticCountInterface {
    active: number;
    history: HistoryCountInterface;
    mobCategory: Record<MobCategoryEnum, number>;
    total: number;
}

export default StatisticCountInterface;