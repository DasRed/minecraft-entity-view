interface StatisticEntityInternalStateInterface {
    firstPosition: {
        x: number;
        y: number;
        z: number;
    },
    previousPosition: {
        x: number;
        y: number;
        z: number;
    },
    removeTimestamp: number | null;
}

export default StatisticEntityInternalStateInterface;