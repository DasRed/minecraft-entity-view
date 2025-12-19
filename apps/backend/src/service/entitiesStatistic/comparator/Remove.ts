import EntitiesStatisticComparatorAbstract from '@/service/entitiesStatistic/comparator/Abstract';
import Store from '@/service/Store';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';

export default class EntitiesStatisticComparatorRemove extends EntitiesStatisticComparatorAbstract {
    protected store: Store;

    constructor(store: Store) {
        super();

        this.store = store;
    }

    public compare(entityA: StatisticEntityInterface, entityB: StatisticEntityInterface): number | null {
        const entityInternalStateA = this.store.getEntityInternalState(entityA);
        const entityInternalStateB = this.store.getEntityInternalState(entityB);

        if (entityInternalStateA.removeTimestamp !== null && entityInternalStateB.removeTimestamp === null) {
            return 1;
        }
        else if (entityInternalStateA.removeTimestamp === null && entityInternalStateB.removeTimestamp !== null) {
            return -1;
        }
        else if (entityInternalStateA.removeTimestamp !== null && entityInternalStateB.removeTimestamp !== null) {
            return entityInternalStateA.removeTimestamp - entityInternalStateB.removeTimestamp;
        }

        return null;
    }
}