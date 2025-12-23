import config from '@/config';
import rconSender from '@/lib/rconSender';
import MessageHandlerEntityKill from '@/service/messageHandler/EntityKill';
import WebSocketServer from '@/service/WebSocketServer';

const wss = new WebSocketServer(config.websocket.port, [
    new MessageHandlerEntityKill(rconSender),
]);

export default wss;