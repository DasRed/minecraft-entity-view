import getMobImageByType from '@/lib/getMobImageByType';
import {ReactElement} from 'react';

interface MobImageOptionsInterface {
    type: string;
    className?: string;
}

export default function MobImage({type, className}: MobImageOptionsInterface): ReactElement {
    const image = getMobImageByType(type);

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
