import Coordinates from '@/component/Coordinates';
import useMap from '@/component/map/provider/map/use';
import {Point} from 'leaflet';
import {ReactElement, useEffect, useState} from 'react';

export default function MapCoordinates(): ReactElement {
    const map                           = useMap();
    const [coordinates, setCoordinates] = useState<Point | null>(null);

    useEffect(() => {
        map.leafletMap.on('mousemove', (event) => {
            const point = map.toPoint(event.latlng);
            point.x = Math.floor(point.x);
            point.y = Math.floor(point.y);

            setCoordinates(point);
        });
        return () => void map.leafletMap.off('mousemove');
    }, [map]);

    return (
        <div className="border border-gray-600 bg-white/75 rounded text-sm transition-all absolute z-2 left-2 bottom-2 py-1 px-2 pointer-events-none">
            Coordinates: <Coordinates x={coordinates?.x} z={coordinates?.y} />
        </div>
    );
}