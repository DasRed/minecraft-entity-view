import apiClient from '@/lib/apiClient';
import store from '@/lib/store';
import DimensionsUpdater from '@/service/updater/Dimensions';

const dimensionsUpdater = new DimensionsUpdater(apiClient, store);

export default dimensionsUpdater;
