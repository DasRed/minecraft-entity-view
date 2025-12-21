import MapContextDimension from '@/component/map/provider/dimension/Context';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {useContext} from 'react';

export default function useDimension(): APIDimensionInterface {
    const ctx = useContext(MapContextDimension);

    if (!ctx) {
        throw new Error('useMap must be used inside MapProviderDimension');
    }

    return ctx.dimension;
}