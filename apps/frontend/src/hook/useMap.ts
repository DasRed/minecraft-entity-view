import MapContext from '@/context/MapContext';
import SquaremapMap from '@/squaremap/Map';
import {useContext} from 'react';

export default function useMap(): SquaremapMap {
    const ctx = useContext(MapContext);

    if (!ctx) {
        throw new Error('useMap must be used inside MapProvider');
    }

    return ctx;
}