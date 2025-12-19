export default {
    // websocket: process.env.NODE_ENV === 'production' ? 'ws://minecraft.dasred.de:7791' : 'ws://localhost:7791',
    websocket: 'ws://minecraft.dasred.de:7791',

    squaremapBackend: process.env.NODE_ENV === 'production' ? 'http://atlas.dasred.de:7792': 'http://localhost:7792'
} as const;