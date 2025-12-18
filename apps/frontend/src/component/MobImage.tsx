import MobImages from '@/constant/MobImages';
import {ReactElement} from 'react';

interface MobImageOptionsInterface {
    type: string;
    className?: string;
}

export default function MobImage({type, className}: MobImageOptionsInterface): ReactElement {
    const image = (MobImages[type] ?? `/item/${type.replace(':', '/')}.png`).replace('{size}', '16x16');

    return (
        <img
            data-image={image}
            src={image}
            alt=""
            className={className}
            onError={(event) => event.currentTarget.src = '/unknown.png'}
        />
    );
}
