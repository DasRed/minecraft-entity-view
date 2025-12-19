import collator from '@/lib/collator';
import EntitiesStatisticComparatorAbstract from '@/service/entitiesStatistic/comparator/Abstract';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';

export default class EntitiesStatisticComparatorUUID extends EntitiesStatisticComparatorAbstract {
    public compare(entityA: StatisticEntityInterface, entityB: StatisticEntityInterface): number {
        return collator.compare(entityA.uuid, entityB.uuid);
    }
}