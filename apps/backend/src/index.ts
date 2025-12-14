import config from '@/config';
import DifferenceSenderHandler from '@/service/DifferenceSenderHandler';
import EntitiesStatisticUpdater from '@/service/EntitiesStatisticUpdater';
import MinecraftApiClient from '@/service/MinecraftApiClient';
import WebSocketServer from '@/service/WebSocketServer';
import WebSocketServerEventEnum from '@/service/webSocketServer/EventEnum';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';

const esu = new EntitiesStatisticUpdater(new MinecraftApiClient(config.minecraftServer), config.entitiesStatisticUpdater.interval);
await esu.start();

const wss = new WebSocketServer(config.websocket.port);
wss.on(WebSocketServerEventEnum.CLIENT_CONNECTED, (ws) => wss.sendTo(ws, CommandEnum.FULL_STATISTIC, esu.getCurrentData()));

new DifferenceSenderHandler(esu, wss);

setInterval(() => wss.sendToAll(CommandEnum.FULL_STATISTIC, esu.getCurrentData()), config.entitiesStatisticUpdater.sendFullUpdateEvery);

console.log(`> WebSocket on ws://localhost:${config.websocket.port}`);
