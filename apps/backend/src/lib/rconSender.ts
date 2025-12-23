import config from '@/config';
import RConSender from '@/service/RConSender';

const rconSender = new RConSender(config.rcon);

export default rconSender;