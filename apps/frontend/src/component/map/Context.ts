import Map from '@/service/Map';
import {createContext} from 'react';

const MapContext = createContext<Map | null>(null);

export default MapContext;
