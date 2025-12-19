import EntitiesStatisticComparatorAbstract from '@/service/entitiesStatistic/comparator/Abstract';
import Store from '@/service/Store';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';

export default class EntitiesStatisticComparatorFirstSeen extends EntitiesStatisticComparatorAbstract {
    protected store: Store;

    constructor(store: Store) {
        super();

        this.store = store;
    }

    public compare(entityA: StatisticEntityInterface, entityB: StatisticEntityInterface): number | null {
        const entityInternalStateA = this.store.getEntityInternalState(entityA);
        const entityInternalStateB = this.store.getEntityInternalState(entityB);

        if (entityInternalStateA.firstSeenTimestamp !== entityInternalStateB.firstSeenTimestamp) {
            return entityInternalStateA.firstSeenTimestamp - entityInternalStateB.firstSeenTimestamp;
        }

        return null;
    }
}