import config from '@/config';
import entitiesStatistic from '@/lib/entitiesStatistic';
import {WebSocketServer} from 'ws';

const wss = new WebSocketServer({port: config.websocket.port});

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', async (message) => {
        const data = JSON.parse(message.toString());

        if (data.type)

        switch (data.type) {
            case 'getEntitiesStatistic':
            default:
                ws.send(JSON.stringify({type: data.type, data: await entitiesStatistic.updateAndGetStatistic()}));
                break;
        }
    });

    ws.on('close', () => console.log('Client disconnected'));
});

console.log(`> WebSocket on ws://localhost:${config.websocket.port}`);