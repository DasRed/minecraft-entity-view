export default {
    // Prod
    // minecraftServer: 'http://atlas.dasred.de:9874',

    // Test
    minecraftServer: 'http://atlas.dasred.de:9875',

    // Local
    // minecraftServer: 'http://localhost:9874',

    websocket: {
        protocol: 'ws',
        host:     'localhost',
        port:     7791,
    },
} as const;