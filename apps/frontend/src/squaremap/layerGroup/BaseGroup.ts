import {Layer, LayerGroup, LayerOptions} from 'leaflet';

export default class SquaremapBaseLayerGroup extends LayerGroup {
    public readonly id: string;
    public order: number;

    constructor(id: string, order: number = 0, layers?: Layer[], options?: LayerOptions) {
        super(layers, options);

        this.id    = id;
        this.order = order;
    }
}