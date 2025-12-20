import SquaremapMarkerEntryInterface from '@/squaremap/interfaces/MarkerEntryInterface';

interface SquaremapMarkerInterface {
    control: boolean;
    hide: boolean;
    id: string;
    markers: SquaremapMarkerEntryInterface[];
    name: string;
    order: number;
    timestamp: number;
    z_index: number;
}

export default SquaremapMarkerInterface;