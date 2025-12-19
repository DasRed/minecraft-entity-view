import config from '@/config';
import apiClient from '@/lib/apiClient';
import store from '@/lib/store';
import wss from '@/lib/wss';
import DifferenceHandlerPlayer from '@/service/differenceHandler/Player';
import PlayersUpdater from '@/service/updater/Players';

const playersUpdater = new PlayersUpdater(apiClient, store, config.playersUpdater.interval, [
    new DifferenceHandlerPlayer(wss)
]);

export default playersUpdater;
