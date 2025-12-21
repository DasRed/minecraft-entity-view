import EntitiesStatisticUpdaterConfigInterface from '@/service/entitiesStatistic/ConfigInterface';

export default {
    minecraftServer: 'http://atlas.dasred.de:9874',
    // minecraftServer: 'http://atlas.dasred.de:9875',
    // minecraftServer: 'http://localhost:9874',

    websocket: {
        protocol: 'ws',
        host:     'localhost',
        port:     7791,
    },

    entitiesStatisticUpdater: <EntitiesStatisticUpdaterConfigInterface>{
        interval:             50,
        deleteEntityAfter:    2_000,
        isNewEntityFor:       800,
        isEntityReorderedFor: 300,
        // preserveHistoryDataLength: 2_000, // with once per seconds this are 33mins
        // historyDeltaBetweenPoints: 1000, // once per second
        preserveHistoryDataLength: 4_000, // with two per seconds this are 33mins
        historyDeltaBetweenPoints: 500, // two per second
    },
    playersUpdater:           {
        interval: 250,
    },

} as const;