import DimensionEnum from '../../../constant/DimensionEnum';
import MobCategoryEnum from '../../../constant/MobCategoryEnum';

interface APIEntityBaseInterface {
    category: MobCategoryEnum;
    chunkLoaded: boolean,
    customName?: string;
    dimension: DimensionEnum;
    displayName: string;
    displayType: string;
    name: string;
    onGround?: boolean;
    tags: string[];
    uuid: string;
    x: number;
    y: number;
    z: number;
}

export default APIEntityBaseInterface;