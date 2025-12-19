import config from '@/config';
import apiClient from '@/lib/apiClient';
import sorter from '@/lib/sorter';
import store from '@/lib/store';
import EntitiesStatisticUpdater from '@/service/updater/EntitiesStatistic';

const entitiesStatisticUpdater = new EntitiesStatisticUpdater(apiClient, store, config.entitiesStatisticUpdater, sorter);

export default entitiesStatisticUpdater;
