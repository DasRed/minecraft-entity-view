import ComparatorAbstract from '@/service/comparator/Abstract';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';

export default class ComparatorFirstSeen extends ComparatorAbstract {
    public compare(entityA: StatisticEntityInterface, entityB: StatisticEntityInterface): number | null {
        if (entityA.stats.firstSeenTimestamp !== entityB.stats.firstSeenTimestamp) {
            return entityA.stats.firstSeenTimestamp - entityB.stats.firstSeenTimestamp;
        }

        return null;
    }
}