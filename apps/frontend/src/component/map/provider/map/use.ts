import MapContextMap from '@/component/map/provider/map/Context';
import Map from '@/service/Map';
import {useContext} from 'react';

export default function useMap(): Map {
    const ctx = useContext(MapContextMap);

    if (!ctx) {
        throw new Error('useMap must be used inside MapProviderMap');
    }

    return ctx;
}