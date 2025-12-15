import EntitiesStatisticUpdaterComparatorAbstract from '@/service/comparator/Abstract';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import StatisticMobListInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticMobListInterface';

export default class EntitiesStatisticUpdaterSorter {
    private comparators: Record<keyof StatisticEntityInterface['stats']['order'], EntitiesStatisticUpdaterComparatorAbstract[]>;
    private fallbackComparator: EntitiesStatisticUpdaterComparatorAbstract;

    constructor(fallbackComparator: EntitiesStatisticUpdaterComparatorAbstract, comparators: Record<keyof StatisticEntityInterface['stats']['order'], EntitiesStatisticUpdaterComparatorAbstract[]>) {
        this.comparators        = comparators;
        this.fallbackComparator = fallbackComparator;
    }

    public sort(entityCategory: StatisticMobListInterface): this {
        Object.values(entityCategory).forEach((entities) => {
            const values = Object.values(entities);

            this.sortBy('default', values)
                .sortBy('name', values)
                .sortBy('dimension', values)
                .sortBy('position', values);
        });

        return this;
    }

    protected sortBy(key: keyof StatisticEntityInterface['stats']['order'], entities: StatisticEntityInterface[]): this {
        entities.sort((entityA, entityB) => {
            for (let comparator of this.comparators[key]) {
                const result = comparator.compare(entityA, entityB);
                if (result !== null) {
                    return result;
                }
            }

            return this.fallbackComparator.compare(entityA, entityB) ?? 0;
        }).forEach((entity, index) => entity.stats.order[key] = index);

        return this;
    }
}