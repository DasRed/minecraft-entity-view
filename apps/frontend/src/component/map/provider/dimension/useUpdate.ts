import MapContextDimension, {MapContextDimensionInterface} from '@/component/map/provider/dimension/Context';
import {useContext} from 'react';

export default function useDimensionUpdate(): MapContextDimensionInterface {
    const ctx = useContext(MapContextDimension);

    if (!ctx) {
        throw new Error('useMap must be used inside MapProviderDimension');
    }

    return ctx;
}