import config from '@/config';
import updaters from '@/lib/updater';
import wss from '@/lib/wss';
import WebSocketServerEventEnum from '@/service/webSocketServer/EventEnum';

await Promise.all(updaters.map((updater) => updater.start()));

wss.on(WebSocketServerEventEnum.CLIENT_CONNECTED, (ws) =>
    updaters.forEach((updater) =>
        wss.sendTo(ws, updater.getCommandOnClientConnect(), updater.getCurrentData()),
    ),
);

console.log(`> WebSocket on ws://localhost:${config.websocket.port}`);
