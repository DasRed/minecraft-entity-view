import config from '@/config';
import apiClient from '@/lib/apiClient';
import sorter from '@/lib/sorter';
import store from '@/lib/store';
import wss from '@/lib/wss';
import EntitiesStatisticDifferenceSenderCount from '@/service/entitiesStatistic/differenceSender/Count';
import EntitiesStatisticDifferenceSenderEntity from '@/service/entitiesStatistic/differenceSender/Entity';
import EntitiesStatisticDifferenceSenderHistory from '@/service/entitiesStatistic/differenceSender/History';
import EntitiesStatisticDifferenceSenderTypeCount from '@/service/entitiesStatistic/differenceSender/TypeCount';
import EntitiesStatisticUpdater from '@/service/updater/EntitiesStatistic';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';

const entitiesStatisticUpdater = new EntitiesStatisticUpdater(apiClient, store, config.entitiesStatisticUpdater, sorter, [
    new EntitiesStatisticDifferenceSenderCount(wss),
    new EntitiesStatisticDifferenceSenderHistory(wss),
    new EntitiesStatisticDifferenceSenderTypeCount(wss),
    ...Object.values(MobCategoryEnum).map((key) => new EntitiesStatisticDifferenceSenderEntity(wss, key)),
]);

export default entitiesStatisticUpdater;
