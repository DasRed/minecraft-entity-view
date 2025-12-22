import cn from '@/lib/cn';
import {PropsWithChildren, ReactElement} from 'react';

interface MapLayerContainerOptionsInterface {
    className?: string;
    expandable?: boolean;
}

export default function MapControlContainer({expandable = true, className, children}: PropsWithChildren<MapLayerContainerOptionsInterface>): ReactElement {
    return (
        // <div className={cn('border border-gray-600 bg-white/75 rounded text-sm pointer-events-auto flex flex-col gap-1 items-center w-12 overflow-hidden select-none transition-all', {
        //     'hover:w-30': expandable
        // }, className)}>
        <div
            className={cn(
                'border border-gray-600 bg-white/75 rounded text-sm pointer-events-auto',
                'inline-flex flex-col gap-1 items-start overflow-hidden select-none',
                'transition-[max-width] duration-300 max-w-12',
                {
                    'hover:max-w-max': expandable,
                },
                className,
            )}
        >
            {children}
        </div>
    );
}