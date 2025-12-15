import config from '@/config';
import MinecraftApiClient from '@/service/MinecraftApiClient';

const apiClient = new MinecraftApiClient(config.minecraftServer);

export default apiClient;
