import collator from '@/lib/collator';
import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';

export default class GetEntitiesStatisticWebsocketClientHandler {
    public handle(data: StatisticsInterface) {
        // sort by update count and last seen
        data.entitiesList = Object.values(data.entities).sort((entityA, entityB) => {
            // moved from previous position
            if (entityA.stats.movedFromPreviousPosition === true && entityB.stats.movedFromPreviousPosition === false) {
                return 1;
            }
            else if (entityA.stats.movedFromPreviousPosition === false && entityB.stats.movedFromPreviousPosition === true) {
                return -1;
            }

            // moved from first position
            if (entityA.stats.movedFromFirstPosition === true && entityB.stats.movedFromFirstPosition === false) {
                return 1;
            }
            else if (entityA.stats.movedFromFirstPosition === false && entityB.stats.movedFromFirstPosition === true) {
                return -1;
            }

            // different updated count
            if (entityA.stats.updateCount !== entityB.stats.updateCount) {
                return entityB.stats.updateCount - entityA.stats.updateCount;
            }

            const nameA = entityA.type === EntityTypeEnum.ITEM ? entityA.item.name : (entityA.customName ?? entityA.name);
            const nameB = entityB.type === EntityTypeEnum.ITEM ? entityB.item.name : (entityB.customName ?? entityB.name);
            if (nameA !== nameB) {
                return collator.compare(nameA, nameB);
            }

            if (entityA.x !== entityB.x) {
                return entityA.x - entityB.x;
            }

            if (entityA.y !== entityB.y) {
                return entityA.y - entityB.y;
            }

            return entityA.z - entityB.z;
        });

        data.entitiesList.forEach((entity) => entity.stats.firstSeen = new Date(entity.stats.firstSeen));

        data.count.history.total.forEach((entry) => entry.x = new Date(entry.x));
        data.count.history.active.forEach((entry) => entry.x = new Date(entry.x));
        data.count.history.added.forEach((entry) => entry.x = new Date(entry.x));
        data.count.history.updated.forEach((entry) => entry.x = new Date(entry.x));
        data.count.history.deleted.forEach((entry) => entry.x = new Date(entry.x));
        Object.values(data.count.history.mobCategory).forEach((entries) => entries.forEach((entry) => entry.x = new Date(entry.x)));

        return data;
    }
}