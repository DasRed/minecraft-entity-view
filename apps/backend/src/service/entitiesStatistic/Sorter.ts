import EntitiesStatisticUpdaterComparatorAbstract from '@/service/entitiesStatistic/comparator/Abstract';
import EntityOrderTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityOrderTypeEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import StatisticMobListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticMobListInterface';

export default class EntitiesStatisticUpdaterSorter {
    private comparators: Record<EntityOrderTypeEnum, EntitiesStatisticUpdaterComparatorAbstract[]>;
    private fallbackComparator: EntitiesStatisticUpdaterComparatorAbstract;

    constructor(fallbackComparator: EntitiesStatisticUpdaterComparatorAbstract, comparators: Record<EntityOrderTypeEnum, EntitiesStatisticUpdaterComparatorAbstract[]>) {
        this.comparators        = comparators;
        this.fallbackComparator = fallbackComparator;
    }

    public sort(entityCategory: StatisticMobListInterface): this {
        Object.values(entityCategory).forEach((entities) => {
            const values = Object.values(entities);

            Object.values(EntityOrderTypeEnum).forEach((orderType) => this.sortBy(orderType, values));
        });

        return this;
    }

    protected sortBy(key: EntityOrderTypeEnum, entities: StatisticEntityInterface[]): this {
        entities
            .sort((entityA, entityB) => {
                for (let comparator of this.comparators[key]) {
                    const result = comparator.compare(entityA, entityB);
                    if (result !== null) {
                        return result;
                    }
                }

                return this.fallbackComparator.compare(entityA, entityB) ?? 0;
            })
            .forEach((entity, index) => entity.stats.order[key] = index);

        return this;
    }
}