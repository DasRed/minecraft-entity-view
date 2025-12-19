import collator from '@/lib/collator';
import EntitiesStatisticComparatorAbstract from '@/service/entitiesStatistic/comparator/Abstract';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';

export default class EntitiesStatisticComparatorName extends EntitiesStatisticComparatorAbstract {
    public compare(entityA: StatisticEntityInterface, entityB: StatisticEntityInterface): number | null {
        const nameA = entityA.customName ?? entityA.displayName;
        const nameB = entityB.customName ?? entityB.displayName;
        if (nameA !== nameB) {
            return collator.compare(nameA, nameB);
        }

        return null;
    }
}