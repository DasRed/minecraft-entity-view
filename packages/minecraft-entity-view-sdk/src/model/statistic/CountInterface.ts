import MobListEnum from '@dasred/minecraft-entity-view-sdk/constant/MobListEnum';
import HistoryCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountInterface';

interface StatisticCountInterface {
    total: number;
    active: number;
    mobCategory: Record<MobListEnum, number> & {other: number};
    history: {
        total: HistoryCountInterface[];
        active: HistoryCountInterface[];
        mobCategory: Record<MobListEnum, HistoryCountInterface[]> & {other: HistoryCountInterface[]};
    }
}

export default StatisticCountInterface;