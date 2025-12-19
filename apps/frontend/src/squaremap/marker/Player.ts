import {Icon, LatLngExpression, Marker, Point, PointTuple} from 'leaflet';

export default class SquaremapMarkerPlayer extends Marker {
    icon: Icon;
    rotationAngle: number;
    rotationOrigin: string;

    constructor(rotationAngle: number, latlng: LatLngExpression) {
        const anchor: PointTuple = [8, 9];
        const icon               = new Icon({
            iconUrl:       'images/icon/player.png',
            iconSize:      [17, 16],
            iconAnchor:    anchor,
            tooltipAnchor: [0, 0],
        });

        super(latlng, {icon});

        this.icon           = icon;
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

    applyRotation() {
        const element = this.getElement();
        if (element === undefined) {
            return;
        }

        element.style.transformOrigin = this.rotationOrigin;
        element.style.transform += ' rotateZ(' + this.rotationAngle + 'deg)';
    }

    setRotationAngle(angle: number): this {
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
}