import Coordinates from '@/component/Coordinates';
import useMap from '@/component/map/provider/map/use';
import {Point} from 'leaflet';
import {ReactElement, useEffect, useState} from 'react';

export default function MapChunkPosition(): ReactElement {
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

    const minX = coordinates ? Math.floor(coordinates.x / 16) * 16 : undefined;
    const minZ = coordinates ? Math.floor(coordinates.y / 16) * 16 : undefined;

    const maxX = coordinates ? Math.floor(coordinates.x / 16 + 1) * 16 - 1 : undefined;
    const maxZ = coordinates ? Math.floor(coordinates.y / 16 + 1) * 16 - 1 : undefined;

    return (
        <div className="border border-gray-600 bg-white/75 rounded text-sm transition-all py-1 px-2">
            Chunk: [<Coordinates className="px-1" x={minX} z={minZ} />] - [<Coordinates className="px-1" x={maxX} z={maxZ} />]
        </div>
    );
}