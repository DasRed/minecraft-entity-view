import config from '@/config';
import WebSocketClient from '@/service/WebSocketClient';

const wsc = new WebSocketClient(config.websocket);

export default wsc;