import config from '@/config';
import sender from '@/lib/sender';
import updater from '@/lib/updater';
import wss from '@/lib/wss';
import WebSocketServerEventEnum from '@/service/webSocketServer/EventEnum';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';

await updater.start();
wss.on(WebSocketServerEventEnum.CLIENT_CONNECTED, (ws) => wss.sendTo(ws, CommandEnum.FULL_STATISTIC, updater.getCurrentData()));
sender.start();

if (config.fullUpdate.enabled) {
    setInterval(() => wss.sendToAll(CommandEnum.FULL_STATISTIC, updater.getCurrentData()), config.fullUpdate.every);
}

console.log(`> WebSocket on ws://localhost:${config.websocket.port}`);
