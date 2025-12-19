import config from '@/config';
import apiClient from '@/lib/apiClient';
import store from '@/lib/store';
import PlayersUpdater from '@/service/updater/Players';

const playersUpdater = new PlayersUpdater(apiClient, store, config.playersUpdater.interval);

export default playersUpdater;
