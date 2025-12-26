import EntitiesStatisticUpdaterConfigInterface from '@/service/entitiesStatistic/ConfigInterface';
import dotenv from 'dotenv';

dotenv.config({path: '../../.env', quiet: true});

export default {
    minecraftServer: process.env.MINECRAFT_SERVER ?? 'http://atlas.dasred.de:9874',

    websocket: {
        protocol: process.env.WEBSOCKET_SERVER_PROTOCOL ?? 'ws',
        host:     process.env.WEBSOCKET_SERVER_HOST ?? 'localhost',
        port:     Number(process.env.WEBSOCKET_SERVER_PORT ?? 7791),
    },

    entitiesStatisticUpdater: <EntitiesStatisticUpdaterConfigInterface>{
        interval:                  Number(process.env.UPDATER_ENTITIES_STATISTIC_INTERVAL ?? 50),
        deleteEntityAfter:         Number(process.env.UPDATER_ENTITIES_STATISTIC_DELETE_ENTITY_AFTER ?? 2_000),
        isNewEntityFor:            Number(process.env.UPDATER_ENTITIES_STATISTIC_IS_NEW_ENTITY_FOR ?? 800),
        isEntityReorderedFor:      Number(process.env.UPDATER_ENTITIES_STATISTIC_IS_ENTITY_REORDERED_FOR ?? 300),
        preserveHistoryDataLength: Number(process.env.UPDATER_ENTITIES_STATISTIC_PRESERVE_HISTORY_DATA_LENGTH ?? 4_000), // with two per seconds this are 33mins
        historyDeltaBetweenPoints: Number(process.env.UPDATER_ENTITIES_STATISTIC_HISTORY_DELTA_BETWEEN_POINTS ?? 500), // two per second
    },
    playersUpdater:           {
        interval: Number(process.env.UPDATER_PLAYERS_INTERVAL ?? 50),
    },
    chunksActiveUpdater:           {
        interval: Number(process.env.UPDATER_CHUNKS_ACTIVE_INTERVAL ?? 50),
    },
    rcon:                     {
        host:     process.env.RCON_HOST ?? 'minecraft.dasred.de',
        port:     Number(process.env.RCON_PORT ?? 25575),
        password: process.env.RCON_PASSWORD!,
    },
} as const;