import ComparatorAbstract from '@/service/comparator/Abstract';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';

export default class ComparatorRemove extends ComparatorAbstract {
    public compare(entityA: StatisticEntityInterface, entityB: StatisticEntityInterface): number | null {
        if (entityA.stats.removeTimestamp !== null && entityB.stats.removeTimestamp === null) {
            return 1;
        }
        else if (entityA.stats.removeTimestamp === null && entityB.stats.removeTimestamp !== null) {
            return -1;
        }
        else if (entityA.stats.removeTimestamp !== null && entityB.stats.removeTimestamp !== null) {
            return entityA.stats.removeTimestamp - entityB.stats.removeTimestamp;
        }

        return null;
    }
}