import EntityInterface from '@dasred/minecraft-entity-view-sdk/model/EntityInterface';

interface StatisticEntityInterface extends EntityInterface {
    stats: {
        updateCount: number;
        firstSeen: Date;
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
        movedFromFirstPosition: boolean;
        movedFromPreviousPosition: boolean;
    };
}

export default StatisticEntityInterface;