import MapContextDimension from '@/component/map/provider/dimension/Context';
import useMap from '@/component/map/provider/map/use';
import setting from '@/lib/setting';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {PropsWithChildren, useState} from 'react';

export default function MapProviderDimension({children}: PropsWithChildren<unknown>) {
    const map                       = useMap();
    const [dimension, setDimension] = useState<APIDimensionInterface>(map.getCurrentDimension());

    function updateDimension(dimensionNew: APIDimensionInterface) {
        if (dimensionNew.id !== dimension.id) {
            map.setDimensionId(dimensionNew.id);
            setDimension(dimensionNew);
            setting.set('dimension', dimensionNew.id);
        }
    }

    return (
        <MapContextDimension.Provider value={{dimension, setDimension: updateDimension}}>
            {children}
        </MapContextDimension.Provider>
    );
}