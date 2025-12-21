import useMap from '@/component/map/provider/map/use';
import {Point} from 'leaflet';
import {ReactElement, useEffect, useState} from 'react';

export default function MapCoordinates(): ReactElement {
    const map                           = useMap();
    const [coordinates, setCoordinates] = useState<Point | null>(null);

    useEffect(() => {
        map.leafletMap.on('mousemove', (event) => setCoordinates(map.toPoint(event.latlng)));
        return () => void map.leafletMap.off('mousemove');
    }, [map]);

    return (
        <div className="border border-gray-600 bg-white/75 rounded text-sm transition-all absolute z-2 left-2 bottom-2 py-1 px-2 pointer-events-none">
            Coordinates: {coordinates?.x ?? '--'} / {coordinates?.y ?? '--'}
        </div>
    );
}