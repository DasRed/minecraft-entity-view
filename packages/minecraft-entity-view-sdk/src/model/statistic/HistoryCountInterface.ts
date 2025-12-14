import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import HistoryCountEntryInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountEntryInterface';

interface HistoryCountInterface {
    active: HistoryCountEntryInterface[];
    mobCategory: Record<MobCategoryEnum, HistoryCountEntryInterface[]>;
    total: HistoryCountEntryInterface[];
}

export default HistoryCountInterface;