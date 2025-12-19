import dimensionsUpdater from '@/lib/updater/dimensions';
import entitiesStatisticUpdater from '@/lib/updater/entitiesStatistic';
import playersUpdater from '@/lib/updater/players';
import UpdaterAbstract from '@/service/updater/Abstract';

export default <UpdaterAbstract[]>[
    entitiesStatisticUpdater,
    dimensionsUpdater,
    playersUpdater,
];