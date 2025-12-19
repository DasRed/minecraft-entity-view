interface EntitiesStatisticUpdaterConfigInterface {
    deleteEntityAfter: number;
    interval: number;
    isNewEntityFor: number;
    isEntityReorderedFor: number;
    preserveHistoryDataLength: number;
    historyDeltaBetweenPoints: number;
}

export default EntitiesStatisticUpdaterConfigInterface;