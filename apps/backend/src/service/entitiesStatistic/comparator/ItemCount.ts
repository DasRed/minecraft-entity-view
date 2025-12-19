import EntitiesStatisticComparatorAbstract from '@/service/entitiesStatistic/comparator/Abstract';
import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';

export default class EntitiesStatisticComparatorItemCount extends EntitiesStatisticComparatorAbstract {
    public compare(entityA: StatisticEntityInterface, entityB: StatisticEntityInterface): number | null {
        if (entityA.type === EntityTypeEnum.ITEM && entityB.type === EntityTypeEnum.ITEM && entityA.item.count !== entityB.item.count) {
            return entityB.item.count - entityA.item.count;
        }

        return null;
    }
}