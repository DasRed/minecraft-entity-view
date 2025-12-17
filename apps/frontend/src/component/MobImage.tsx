import MobImages from '@/constant/MobImages';
import {ReactElement} from 'react';

interface MobImageOptionsInterface {
    type: string;
    className?: string;
}

export default function MobImage({type, className}: MobImageOptionsInterface): ReactElement {
    const image = MobImages[type] ?? `/item/${type.replace(':', '/')}.png`;

    return (
        <object data-type={type} data={image.replace('{size}', '16x16')} type="image/png" className={className}>
            <img src="/unknown.png" alt=""/>
        </object>
    );
}
