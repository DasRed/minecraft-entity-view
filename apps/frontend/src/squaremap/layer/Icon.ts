import SquaremapLayerEntryIconInterface from '@/squaremap/interfaces/layer/IconInterface';
import SquaremapLayerBase from '@/squaremap/layer/Base';
import SquaremapMap from '@/squaremap/Map';
import {Icon, LayerGroup, Marker} from 'leaflet';

export default class SquaremapLayerIcon extends SquaremapLayerBase {
    constructor(squaremap: SquaremapMap, layerGroup: LayerGroup, options: SquaremapLayerEntryIconInterface) {
        const tooltipAnchor = options.tooltip_anchor ?? {x: 0, z: -options.size.z / 2};

        const layer = new Marker(squaremap.toLatLng(options.point.x, options.point.z), {
            icon: new Icon({
                iconUrl:       `${squaremap.host}/images/icon/registered/${options.icon}.png`,
                iconSize:      [options.size.x, options.size.z],
                iconAnchor:    [options.anchor.x, options.anchor.z],
                popupAnchor:   [tooltipAnchor.x, tooltipAnchor.z],
                tooltipAnchor: [tooltipAnchor.x, tooltipAnchor.z],
            }),
        });

        super(layerGroup, options, layer);
    }
}
