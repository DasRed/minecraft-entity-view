export default {
    websocket: process.env.NODE_ENV === 'production' ? 'ws://minecraft.dasred.de:7791' : 'ws://localhost:7791',
    // websocket: 'ws://minecraft.dasred.de:7791',

    squaremapBackend: process.env.NODE_ENV === 'production' ? 'http://atlas.dasred.de:7792' : 'http://localhost:7792',

    map: {
        zoom: {
            current:   3,
            min:       0,
            max:       8,
            nativeMin: 0,
            nativeMax: 3,
        },
    },

    entity: {
        highlightIfOlderThan: 12 * 60 * 60 * 1000,
    }
} as const;