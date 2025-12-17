import MobCategoryEnum from '../../constant/MobCategoryEnum';

type HistoryCountMobCategoryInterface = Record<'timestamp' | MobCategoryEnum, number[]>;

export default HistoryCountMobCategoryInterface;