import SquaremapMap from '@/squaremap/Map';
import {createContext} from 'react';

const MapContext = createContext<SquaremapMap | null>(null);

export default MapContext;
