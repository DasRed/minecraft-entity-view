import config from '@/config';
import WebSocketServer from '@/service/WebSocketServer';

const wss = new WebSocketServer(config.websocket.port);

export default wss;