import SquaremapLayerEntryBaseInterface from '@/squaremap/interfaces/layer/BaseInterface';
import {Layer, LayerGroup} from 'leaflet';

export default class SquaremapLayerBase {
    constructor(layerGroup: LayerGroup, options: SquaremapLayerEntryBaseInterface, layer: Layer) {
        layer.bindTooltip(() => options.tooltip, {
            direction: 'top',
            sticky:    false,
        });

        layer.remove();
        layer.addTo(layerGroup);
    }
}
