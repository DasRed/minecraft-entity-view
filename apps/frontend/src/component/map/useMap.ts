import MapContext from '@/component/map/Context';
import Map from '@/service/Map';
import {useContext} from 'react';

export default function useMap(): Map {
    const ctx = useContext(MapContext);

    if (!ctx) {
        throw new Error('useMap must be used inside MapProvider');
    }

    return ctx;
}