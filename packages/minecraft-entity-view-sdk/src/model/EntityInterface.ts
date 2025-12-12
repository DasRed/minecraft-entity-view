import EntityEnemyInterface from '@dasred/minecraft-entity-view-sdk/model/EntityEnemyInterface';
import EntityItemInterface from '@dasred/minecraft-entity-view-sdk/model/EntityItemInterface';

type EntityInterface = EntityEnemyInterface & EntityItemInterface;

export default EntityInterface;