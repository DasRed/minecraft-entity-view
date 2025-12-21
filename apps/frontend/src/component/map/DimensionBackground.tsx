import useDimension from '@/component/map/provider/dimension/use';
import cn from '@/lib/cn';
import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import {ReactElement} from 'react';

export default function DimensionBackground(): ReactElement {
    const dimension = useDimension();

    return (
        <div className={cn('absolute inset-0 -z-1 bg-black bg-repeat', {
            'bg-[url(/dimension/background/overworld.png)]':  dimension.id === DimensionEnum.OVERWORLD,
            'bg-[url(/dimension/background/the_nether.png)]': dimension.id === DimensionEnum.NETHER,
            'bg-[url(/dimension/background/the_end.png)]':    dimension.id === DimensionEnum.END,
        })}></div>
    );
}