import {LatLngExpression, Marker, Point, PointTuple} from 'leaflet';

export interface MapMarkerPlayerOptionsInterface {
    anchor: PointTuple;
    rotationAngle: number;
}

export default class MapMarkerPlayer extends Marker {
    rotationAngle: number;
    rotationOrigin: string;

    constructor(latlng: LatLngExpression, options: MapMarkerPlayerOptionsInterface) {
        super(latlng);

        this.rotationAngle  = options.rotationAngle;
        this.rotationOrigin = options.anchor[0] + 'px ' + options.anchor[1] + 'px';

        // Ensure marker keeps rotated during dragging
        this.on('drag', () => this.applyRotation());
    }

    _setPos(pos: Point) {
        // @ts-ignore
        super._setPos(pos);
        this.applyRotation();
    }

    protected applyRotation() {
        const element = this.getElement();
        if (element === undefined) {
            return;
        }

        element.style.transformOrigin = this.rotationOrigin;
        element.style.transform += ' rotateZ(' + this.rotationAngle + 'deg)';
    }

    public setRotationAngle(angle: number): this {
        if (this.rotationAngle === angle) {
            return this;
        }

        // Find the closest equivalent angle to avoid an unnecessarily large rotation
        const delta = ((((angle - this.rotationAngle) % 360) + 540) % 360) - 180;
        this.rotationAngle += delta;
        // @ts-ignore
        this.update();
        return this;
    }

    public updateView(latlng: LatLngExpression, rotationAngle: number) {
        this.setRotationAngle(rotationAngle);
        this.setLatLng(latlng);

        return this;
    }
}