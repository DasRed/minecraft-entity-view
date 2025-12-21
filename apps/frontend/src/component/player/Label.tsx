import cn from '@/lib/cn';
import {LucideEyeClosed} from 'lucide-react';
import {ReactElement} from 'react';

interface PlayerLabelOptionsInterface {
    uuid: string;
    name: string;
    size?: number;
    level?: number;
    isInvisible?: boolean;
    className?: string;
}

export default function PlayerLabel({uuid, size = 16, name, className, level, isInvisible}: PlayerLabelOptionsInterface): ReactElement {
    return (
        <div className={cn('w-max flex flex-row gap-1 items-start flex-nowrap', {'opacity-50': isInvisible === true}, className)}>
            <img src={`https://mc-heads.net/avatar/${uuid}/${size}`} alt=""/>

            {isInvisible && <LucideEyeClosed className="w-4 h-4 opacity-50"/>}

            <div>{name}</div>

            {level !== undefined &&
                <div className="text-nowrap opacity-75 font-normal">
                    [<img src="/item/minecraft/experience_bottle.png" className="w-3 h-3 -mt-1 inline" alt=""/> {level}]
                </div>
            }
        </div>
    );
}