// @ts-ignore
const env: Record<string, string> = import.meta.env;

export default {
    websocket:       env.WEBSOCKET_CLIENT ?? 'ws://minecraft.dasred.de:7791',
    tileLayerServer: env.TILE_LAYER_SERVER ?? 'http://atlas.dasred.de:7792',

    map: {
        zoom: {
            current:   Number(env.MAP_ZOOM_CURRENT ?? 3),
            min:       Number(env.MAP_ZOOM_MIN ?? 0),
            max:       Number(env.MAP_ZOOM_MAX ?? 8),
            nativeMin: Number(env.MAP_ZOOM_NATIVE_MIN ?? 0),
            nativeMax: Number(env.MAP_ZOOM_NATIVE_MAX ?? 3),
        },
    },

    entity: {
        highlightIfOlderThan: Number(env.ENTITY_HIGHLIGHT_IF_OLDER_THAN ?? 12 * 60 * 60 * 1000),
    },
} as const;