import EntityOrderTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityOrderTypeEnum';

interface StatisticEntityInternalStateInterface {
    firstPosition: {
        x: number;
        y: number;
        z: number;
    },
    firstSeenTimestamp: number;
    previousPosition: {
        x: number;
        y: number;
        z: number;
    },
    removeTimestamp: number | null;
}

export default StatisticEntityInternalStateInterface;