import APIEntityEnemyInterface from './entity/EnemyInterface';
import APIEntityItemInterface from './entity/ItemInterface';

type APIEntityInterface = APIEntityEnemyInterface & APIEntityItemInterface;

export default APIEntityInterface;