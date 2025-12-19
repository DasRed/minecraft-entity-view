import collator from '@/lib/collator';
import EntitiesStatisticComparatorAbstract from '@/service/entitiesStatistic/comparator/Abstract';
import DimensionName from '@dasred/minecraft-entity-view-frontend/src/constant/DimensionName';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';

export default class EntitiesStatisticComparatorDimension extends EntitiesStatisticComparatorAbstract {
    public compare(entityA: StatisticEntityInterface, entityB: StatisticEntityInterface): number | null {
        const dimensionA = DimensionName[entityA.dimension];
        const dimensionB = DimensionName[entityB.dimension];
        if (dimensionA !== dimensionB) {
            return collator.compare(dimensionA, dimensionB);
        }

        return null;
    }
}