interface UpdaterConfigInterface {
    deleteEntityAfter: number;
    interval: number;
    isNewEntityFor: number;
    isEntityReorderedFor: number;
    preserveHistoryDataLength: number;
    historyDeltaBetweenPoints: number;
}

export default UpdaterConfigInterface;