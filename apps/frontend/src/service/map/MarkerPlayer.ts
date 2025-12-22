import {Icon, LatLngExpression, Marker, Point, PointTuple} from 'leaflet';

interface MapMarkerPlayerOptionsInterface {
    latlng: LatLngExpression;
    rotationAngle: number;
    anchor: PointTuple;
}

export default class MapMarkerPlayer extends Marker {
    rotationAngle: number;
    rotationOrigin: string;

    constructor({rotationAngle, latlng, anchor}: MapMarkerPlayerOptionsInterface) {
        super(latlng, {
            interactive: false,
            keyboard:    false,
        });

        this.rotationAngle  = rotationAngle;
        this.rotationOrigin = anchor[0] + 'px ' + anchor[1] + 'px';

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

    protected setRotationAngle(angle: number): this {
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