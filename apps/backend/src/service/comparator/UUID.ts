import collator from '@/lib/collator';
import ComparatorAbstract from '@/service/comparator/Abstract';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';

export default class ComparatorUUID extends ComparatorAbstract {
    public compare(entityA: StatisticEntityInterface, entityB: StatisticEntityInterface): number {
        return collator.compare(entityA.uuid, entityB.uuid);
    }
}