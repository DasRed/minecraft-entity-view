import MobImages from '@/constant/MobImages';
import {ReactElement} from 'react';

interface MobImageOptionsInterface {
    type: string;
    className?: string;
}

export default function MobImage({type, className}: MobImageOptionsInterface): ReactElement {
    const image = MobImages[type] ?? `/item/minecraft/${type.replace('minecraft:', '')}.png`;

    return (
        <object data-type={type} data={image.replace('{size}', '16x16')} type="image/png" className={className}>
            <img src="/unknown.png" alt=""/>
        </object>
    );
}
// <img data-type={type} src={image.replace('{size}', '16x16')} className={cn({'opacity-50': MobImages[type] === undefined}, className)} alt=""/>
