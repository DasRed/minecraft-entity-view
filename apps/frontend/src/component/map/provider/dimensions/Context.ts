import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {createContext} from 'react';

const MapContextDimensions = createContext<APIDimensionInterface[]>([]);

export default MapContextDimensions;
