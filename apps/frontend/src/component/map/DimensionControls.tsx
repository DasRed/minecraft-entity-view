import DimensionImage from '@/component/DimensionImage';
import MapControlContainer from '@/component/map/ControlContainer';
import useDimension from '@/component/map/useDimension';
import DimensionName from '@/constant/DimensionName';
import cn from '@/lib/cn';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {ReactElement} from 'react';

interface DimensionControlsOptionsInterface {
    dimensions: APIDimensionInterface[];
}

export default function MapDimensionControls({dimensions}: DimensionControlsOptionsInterface): ReactElement {
    const {dimension, setDimension} = useDimension(dimensions);

    return (
        <MapControlContainer>
            {dimensions.map((entry) => (
                <div
                    key={entry.id}
                    data-dimension={entry.id}
                    onClick={() => setDimension(entry.id)}
                    className={cn('flex flex-row flex-nowrap items-center text-nowrap w-full pl-2 py-1  transition-all pointer-events-none', {
                        'pointer-events-auto cursor-pointer grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:bg-orange-400/50': dimension.id !== entry.id,
                    })}
                >
                    <DimensionImage dimension={entry.id} size={16}/>
                    <span className="ml-2">{DimensionName[entry.id] ?? entry.id}</span>
                </div>
            ))}
        </MapControlContainer>
    );
}