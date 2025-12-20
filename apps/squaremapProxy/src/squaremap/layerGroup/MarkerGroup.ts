import SquaremapMarkerInterface from '@/squaremap/interfaces/MarkerInterface';
import SquaremapBaseLayerGroup from '@/squaremap/layerGroup/BaseGroup';

export default class SquaremapMarkerLayerGroup extends SquaremapBaseLayerGroup {
    public timestamp: number;

    constructor(entry: SquaremapMarkerInterface) {
        super(entry.id, entry.order);

        this.timestamp = entry.timestamp;
        this.setZIndex(entry.z_index)
    }
}