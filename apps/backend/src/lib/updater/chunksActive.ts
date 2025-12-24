import config from '@/config';
import apiClient from '@/lib/apiClient';
import store from '@/lib/store';
import wss from '@/lib/wss';
import DifferenceHandlerChunkActive from '@/service/differenceHandler/ChunkActive';
import ChunksActiveUpdater from '@/service/updater/ChunksActive';

const chunksActiveUpdater = new ChunksActiveUpdater(apiClient, store, config.chunksActiveUpdater.interval, [
    new DifferenceHandlerChunkActive(wss),
]);

export default chunksActiveUpdater;
