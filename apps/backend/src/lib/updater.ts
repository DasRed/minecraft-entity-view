import config from '@/config';
import apiClient from '@/lib/apiClient';
import sorter from '@/lib/sorter';
import EntitiesStatisticUpdater from '@/service/EntitiesStatisticUpdater';
import MinecraftApiClient from '@/service/MinecraftApiClient';

const updater = new EntitiesStatisticUpdater(apiClient, config.entitiesStatisticUpdater.interval, sorter);

export default updater;
