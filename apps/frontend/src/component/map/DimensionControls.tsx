import DimensionImage from '@/component/DimensionImage';
import MapLayerContainer from '@/component/map/LayerContainer';
import DimensionName from '@/constant/DimensionName';
import useMap from '@/hook/useMap';
import cn from '@/lib/cn';
import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {ReactElement, useState} from 'react';

interface DimensionControlsOptionsInterface {
    dimensions: APIDimensionInterface[];
}

export default function MapDimensionControls({dimensions}: DimensionControlsOptionsInterface): ReactElement {
    const map                       = useMap();
    const [dimension, setDimension] = useState<DimensionEnum>(map.getDimension());

    function updateDimension(dimensionNew: DimensionEnum) {
        if (dimensionNew !== dimension) {
            map.setDimension(dimensionNew);
            setDimension(dimensionNew);
        }
    }

    return (
        <MapLayerContainer className="left-2 top-24 flex flex-col gap-1 items-center overflow-hidden transition-all w-8 hover:w-30">
            {dimensions.map((entry) => (
                <div
                    onClick={() => updateDimension(entry.id)}
                    className={cn('flex flex-row flex-nowrap items-center text-nowrap w-full pl-2 py-1  transition-all pointer-events-none', {
                        'pointer-events-auto cursor-pointer grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:bg-orange-400/50': dimension !== entry.id,
                    })}
                >
                    <DimensionImage dimension={entry.id} size={16}/>
                    <span className="ml-2">{DimensionName[entry.id] ?? entry.id}</span>
                </div>
            ))}
        </MapLayerContainer>
    );
}