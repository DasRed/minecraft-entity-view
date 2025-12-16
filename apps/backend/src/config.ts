import UpdaterConfigInterface from '@/service/UpdaterConfigInterface';

export default {
    minecraftServer: 'http://atlas.dasred.de:9874',
    // minecraftServer: 'http://atlas.dasred.de:9875',
    // minecraftServer: 'http://localhost:9874',

    websocket: {
        protocol: 'ws',
        host:     'localhost',
        port:     7791,
    },

    updater:    <UpdaterConfigInterface>{
        interval:                  250,
        deleteEntityAfter:         2_000,
        isNewEntityFor:            800,
        isEntityReorderedFor:      300,
        // preserveHistoryDataLength: 2_000, // with once per seconds this are 33mins
        historyDeltaBetweenPoints: 1000, // once per second
    },
    fullUpdate: {
        enabled: false,
        every:   60_000,
    },
} as const;