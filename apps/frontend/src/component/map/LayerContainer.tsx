import cn from '@/lib/cn';
import {PropsWithChildren, ReactElement} from 'react';

interface MapLayerContainerOptionsInterface {
    className?: string;
}

export default function MapLayerContainer({className, children}: PropsWithChildren<MapLayerContainerOptionsInterface>): ReactElement {
    return (
        <div className={cn('z-2 absolute border border-gray-600 bg-white/75 rounded text-sm pointer-events-auto overflow-hidden', className)}>
            {children}
        </div>
    );
}