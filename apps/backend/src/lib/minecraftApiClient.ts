import config from '@/config';
import MinecraftApiClient from '@/service/MinecraftApiClient';

const minecraftApiClient = new MinecraftApiClient(config.minecraftServer);
export default minecraftApiClient;