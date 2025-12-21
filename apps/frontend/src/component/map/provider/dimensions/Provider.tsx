import MapContextDimensions from '@/component/map/provider/dimensions/Context';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {PropsWithChildren} from 'react';

interface MapProviderDimensionsOptionsInterface {
    dimensions: APIDimensionInterface[];
}

export default function MapProviderDimensions({dimensions, children}: PropsWithChildren<MapProviderDimensionsOptionsInterface>) {
    return (
        <MapContextDimensions.Provider value={dimensions}>
            {children}
        </MapContextDimensions.Provider>
    );
}