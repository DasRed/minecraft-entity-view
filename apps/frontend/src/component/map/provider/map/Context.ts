import Map from '@/service/Map';
import {createContext} from 'react';

const MapContextMap = createContext<Map | null>(null);

export default MapContextMap;
