import SquaremapLayerEntryBaseInterface from '@/squaremap/interfaces/layer/BaseInterface';

interface SquaremapLayerEntryPolylineInterface extends SquaremapLayerEntryBaseInterface {
    color: string;
    points: { x: number; z: number; }[];
    type: 'polyline';
}

export default SquaremapLayerEntryPolylineInterface;