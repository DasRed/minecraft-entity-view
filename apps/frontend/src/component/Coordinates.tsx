import cn from '@/lib/cn';
import {ReactElement} from 'react';

interface CoordinatesOptionsInterface {
    x?: number;
    y?: number;
    z?: number;
    className?: string;
}

export default function Coordinates({x, y, z, className}: CoordinatesOptionsInterface): ReactElement {
    return (
        <div className={cn('inline-block text-nowrap', className)}>
            {y !== undefined
                ? <span>{x !== undefined ? Math.floor(x) : '--'} | {Math.floor(y)} | {z !== undefined ? Math.floor(z) : '--'}</span>
                : <span>{x !== undefined ? Math.floor(x) : '--'} | {z !== undefined ? Math.floor(z) : '--'}</span>
            }
        </div>
    );
}