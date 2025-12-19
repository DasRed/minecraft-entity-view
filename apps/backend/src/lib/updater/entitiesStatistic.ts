import config from '@/config';
import apiClient from '@/lib/apiClient';
import sorter from '@/lib/sorter';
import store from '@/lib/store';
import wss from '@/lib/wss';
import EntitiesStatisticDifferenceHandlerCount from '@/service/entitiesStatistic/differenceHandler/Count';
import EntitiesStatisticDifferenceHandlerEntity from '@/service/entitiesStatistic/differenceHandler/Entity';
import EntitiesStatisticDifferenceHandlerHistory from '@/service/entitiesStatistic/differenceHandler/History';
import EntitiesStatisticDifferenceHandlerTypeCount from '@/service/entitiesStatistic/differenceHandler/TypeCount';
import EntitiesStatisticUpdater from '@/service/updater/EntitiesStatistic';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';

const entitiesStatisticUpdater = new EntitiesStatisticUpdater(apiClient, store, config.entitiesStatisticUpdater, sorter, [
    new EntitiesStatisticDifferenceHandlerCount(wss),
    new EntitiesStatisticDifferenceHandlerHistory(wss),
    new EntitiesStatisticDifferenceHandlerTypeCount(wss),
    ...Object.values(MobCategoryEnum).map((key) => new EntitiesStatisticDifferenceHandlerEntity(wss, key)),
]);

export default entitiesStatisticUpdater;
