import EntitiesStatisticComparatorAbstract from '@/service/entitiesStatistic/comparator/Abstract';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';

export default class EntitiesStatisticComparatorPosition extends EntitiesStatisticComparatorAbstract {
    public compare(entityA: StatisticEntityInterface, entityB: StatisticEntityInterface): number | null {
        if (entityA.x !== entityB.x) {
            return entityA.x - entityB.x;
        }
        if (entityA.y !== entityB.y) {
            return entityA.y - entityB.y;
        }
        if (entityA.z !== entityB.z) {
            return entityA.z - entityB.z;
        }

        return null;
    }
}