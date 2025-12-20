import SquaremapMarkerEntryInterface from '@/squaremap/interfaces/MarkerEntryInterface';
import SquaremapLayerBase from '@/squaremap/layer/Base';
import SquaremapLayerIcon from '@/squaremap/layer/Icon';
import SquaremapLayerPolyLine from '@/squaremap/layer/Polyline';
import SquaremapMap from '@/squaremap/Map';
import {LayerGroup} from 'leaflet';

export default class SquaremapLayerFactory {
    public static factory(squaremap: SquaremapMap, layerGroup: LayerGroup, options: SquaremapMarkerEntryInterface): SquaremapLayerBase {
        if (options.type === 'icon') {
            return new SquaremapLayerIcon(squaremap, layerGroup, options);
        }
        else if (options.type === 'polyline') {
            return new SquaremapLayerPolyLine(squaremap, layerGroup, options);
        }

        throw new Error(`unknown layer type`, options);
    }
}