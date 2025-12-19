import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';

export default abstract class EntitiesStatisticComparatorAbstract {
    public abstract compare(entityA: StatisticEntityInterface, entityB: StatisticEntityInterface): number | null;
}