import DimensionEnum from '../../constant/DimensionEnum';
import APIDimensionBorderInterface from './dimension/BorderInterface';
import APIDimensionCenterInterface from './dimension/CenterInterface';
import APIDimensionSpawnInterface from './dimension/SpawnInterface';

interface APIDimensionInterface {
    border: APIDimensionBorderInterface;
    center: APIDimensionCenterInterface;
    id: DimensionEnum;
    spawn: APIDimensionSpawnInterface;
}

export default APIDimensionInterface;