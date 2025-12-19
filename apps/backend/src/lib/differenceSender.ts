import entitiesStatisticUpdater from '@/lib/updater/entitiesStatistic';
import wss from '@/lib/wss';
import EntitiesStatisticDifferenceSenderCount from '@/service/entitiesStatistic/differenceSender/Count';
import EntitiesStatisticDifferenceSenderEntity from '@/service/entitiesStatistic/differenceSender/Entity';
import EntitiesStatisticDifferenceSenderHistory from '@/service/entitiesStatistic/differenceSender/History';
import EntitiesStatisticDifferenceSenderTypeCount from '@/service/entitiesStatistic/differenceSender/TypeCount';
import DifferenceSender from '@/service/DifferenceSender';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';

const differenceSender = new DifferenceSender(entitiesStatisticUpdater, [
    new EntitiesStatisticDifferenceSenderCount(wss),
    new EntitiesStatisticDifferenceSenderHistory(wss),
    new EntitiesStatisticDifferenceSenderTypeCount(wss),
    ...Object.values(MobCategoryEnum).map((key) => new EntitiesStatisticDifferenceSenderEntity(wss, key)),
]);

export default differenceSender;

