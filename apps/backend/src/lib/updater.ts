import config from '@/config';
import apiClient from '@/lib/apiClient';
import sorter from '@/lib/sorter';
import store from '@/lib/store';
import EntitiesStatisticUpdater from '@/service/EntitiesStatisticUpdater';

const updater = new EntitiesStatisticUpdater(apiClient, config.updater, sorter, store);

export default updater;
