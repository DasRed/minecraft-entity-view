import DimensionImages from '@/constant/DimensionImages';
import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import {ReactElement} from 'react';

interface DimensionImageOptionsInterface {
    dimension: DimensionEnum;
    className?: string;
    size?: 16 | 32;
}

export default function DimensionImage({dimension, className, size = 32}: DimensionImageOptionsInterface): ReactElement {
    return (
        <img data-dimension={dimension} src={(DimensionImages[dimension] ?? DimensionImages.UNKNOWN).replace('{size}', `${size}x${size}`)} alt="" className={className}/>
    );
}
