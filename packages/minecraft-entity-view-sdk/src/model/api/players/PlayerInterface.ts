import DimensionEnum from '../../../constant/DimensionEnum';
import GameModeEnum from '../../../constant/GameModeEnum';

interface APIPlayerInterface {
    armor: number;
    dimension: DimensionEnum;
    experienceLevel: number;
    gameMode: GameModeEnum;
    gameModeName: string;
    health: number;
    isInvisible: boolean;
    name: string;
    uuid: string;
    x: number;
    y: number;
    yHeadRot: number;
    z: number;
}

export default APIPlayerInterface;