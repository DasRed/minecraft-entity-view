import cn from '@/lib/cn';
import {ReactElement} from 'react';

interface MapControlToggleIconOptionsInterface {
    title: string;
    active?: boolean;
    disabled?: boolean;
    icon: string;
    onToggle: (active: boolean) => void;
}

export default function MapControlToggleIcon({title, icon, active = true, disabled = false, onToggle}: MapControlToggleIconOptionsInterface): ReactElement {
    return (
        <div
            onClick={() => disabled === false && onToggle(!active)}
            className={cn('flex flex-row flex-nowrap items-center text-nowrap w-full pl-1.5 py-1 transition-all hover:bg-orange-400/50', {
                'grayscale-100 ': disabled === false && active === false,
                'grayscale-0':    disabled === false && active === true,
                'cursor-pointer': disabled === false,
            })}
        >
            <img src={icon} alt=""/>
            <span className="px-2">{title}</span>
        </div>
    );
}