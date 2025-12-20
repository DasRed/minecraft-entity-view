import DimensionEnum from '../../constant/DimensionEnum';
import APIDimensionBorderInterface from './dimension/BorderInterface';
import APIDimensionBorderCenterInterface from './dimension/border/CenterInterface';
import APIDimensionSpawnInterface from './dimension/SpawnInterface';

interface APIDimensionInterface {
    border: APIDimensionBorderInterface;
    id: DimensionEnum;
    spawn: APIDimensionSpawnInterface;
}

export default APIDimensionInterface;