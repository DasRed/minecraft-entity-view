import DimensionImage from '@/component/DimensionImage';
import MapLayerContainer from '@/component/map/LayerContainer';
import useDimension from '@/component/map/useDimension';
import DimensionName from '@/constant/DimensionName';
import cn from '@/lib/cn';
import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {ReactElement} from 'react';

interface DimensionControlsOptionsInterface {
    dimensions: APIDimensionInterface[];
}

export default function MapDimensionControls({dimensions}: DimensionControlsOptionsInterface): ReactElement {
    const {dimension, setDimension} = useDimension(dimensions);

    return (
        <>
            <div className={cn('absolute inset-0 -z-1 bg-black bg-repeat', {
                'bg-[url(/dimension/background/overworld.png)]':  dimension.id === DimensionEnum.OVERWORLD,
                'bg-[url(/dimension/background/the_nether.png)]': dimension.id === DimensionEnum.NETHER,
                'bg-[url(/dimension/background/the_end.png)]':    dimension.id === DimensionEnum.END,
            })}></div>
            <MapLayerContainer className="left-2 top-40 flex flex-col gap-1 items-center overflow-hidden transition-all w-8 hover:w-30">
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
            </MapLayerContainer>
        </>
    );
}