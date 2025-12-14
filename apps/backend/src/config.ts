export default {
    // minecraftServer: 'http://atlas.dasred.de:9874',
    minecraftServer: 'http://atlas.dasred.de:9875',
    // minecraftServer: 'http://localhost:9874',

    websocket: {
        protocol: 'ws',
        host:     'localhost',
        port:     7791,
    },

    entitiesStatisticUpdater: {
        interval: 250,
        sendFullUpdateEvery: 60_000,
        removeEntityAfter: 2_000,
    }
} as const;