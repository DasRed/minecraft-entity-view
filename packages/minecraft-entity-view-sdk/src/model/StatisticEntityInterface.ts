import EntityInterface from '@dasred/minecraft-entity-view-sdk/model/EntityInterface';

interface StatisticEntityInterface extends EntityInterface {
    stats: {
        removeTimestamp: number | null;
        firstSeenTimestamp: number;
        order: number;
        firstPosition: {
            x: number;
            y: number;
            z: number;
        },
        previousPosition: {
            x: number;
            y: number;
            z: number;
        },
        moved: boolean;
    };
}

export default StatisticEntityInterface;