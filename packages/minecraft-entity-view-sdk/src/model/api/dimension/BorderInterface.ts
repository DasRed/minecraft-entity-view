import APIDimensionBorderCenterInterface from './border/CenterInterface';
import APIDimensionBorderMinMaxInterface from './border/MinMaxInterface';

interface APIDimensionBorderInterface {
    center: APIDimensionBorderCenterInterface;
    x: APIDimensionBorderMinMaxInterface;
    z: APIDimensionBorderMinMaxInterface;
}

export default APIDimensionBorderInterface;