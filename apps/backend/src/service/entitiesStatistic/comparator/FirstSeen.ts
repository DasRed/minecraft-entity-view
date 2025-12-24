import EntitiesStatisticComparatorAbstract from '@/service/entitiesStatistic/comparator/Abstract';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';

export default class EntitiesStatisticComparatorFirstSeen extends EntitiesStatisticComparatorAbstract {
    public compare(entityA: StatisticEntityInterface, entityB: StatisticEntityInterface): number | null {
        if (entityA.born.at.timestamp !== entityB.born.at.timestamp) {
            return entityA.born.at.timestamp - entityB.born.at.timestamp;
        }

        return null;
    }
}