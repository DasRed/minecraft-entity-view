import MapContextDimensions from '@/component/map/provider/dimensions/Context';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {useContext} from 'react';

export default function useDimensions(): APIDimensionInterface[] {
    const ctx = useContext(MapContextDimensions);

    if (!ctx) {
        throw new Error('useMap must be used inside MapProviderDimensions');
    }

    return ctx;
}