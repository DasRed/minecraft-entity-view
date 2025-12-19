import SquaremapLayerEntryBaseInterface from '@/squaremap/interfaces/layer/BaseInterface';

interface SquaremapLayerEntryIconInterface extends SquaremapLayerEntryBaseInterface {
    anchor: { x: number; z: number; };
    icon: string;
    point: { x: number; z: number; };
    size: { x: number; z: number; };
    tooltip_anchor?: { x: number; z: number; };
    type: 'icon';
}

export default SquaremapLayerEntryIconInterface;