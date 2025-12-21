import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {createContext} from 'react';

export interface MapContextDimensionInterface {
    dimension: APIDimensionInterface;
    setDimension: (dimension: APIDimensionInterface) => void;
}

const MapContextDimension = createContext<MapContextDimensionInterface | null>(null);

export default MapContextDimension;
