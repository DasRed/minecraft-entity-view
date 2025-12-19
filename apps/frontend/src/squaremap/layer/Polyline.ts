import SquaremapLayerEntryPolylineInterface from '@/squaremap/interfaces/layer/PolylineInterface';
import SquaremapLayerBase from '@/squaremap/layer/Base';
import SquaremapMap from '@/squaremap/Map';
import {LayerGroup, Polyline} from 'leaflet';

export default class SquaremapLayerPolyLine extends SquaremapLayerBase {
    constructor(squaremap: SquaremapMap, layerGroup: LayerGroup, options: SquaremapLayerEntryPolylineInterface) {
        const layer = new Polyline(options.points.map((point) => squaremap.toLatLng(point.x, point.z)), {color: options.color});

        super(layerGroup, options, layer);
    }
}
