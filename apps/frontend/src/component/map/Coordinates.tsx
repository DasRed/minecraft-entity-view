import MapLayerContainer from '@/component/map/LayerContainer';
import useMap from '@/component/map/useMap';
import {Point} from 'leaflet';
import {ReactElement, useEffect, useState} from 'react';

export default function MapCoordinates(): ReactElement {
    const map                = useMap();
    const [coordinates, setCoordinates] = useState<Point | null>(null);

    useEffect(() => {
        map.leafletMap.on('mousemove', (event) => setCoordinates(map.toPoint(event.latlng)));
        return () => void map.leafletMap.off('mousemove');
    }, [map]);

    return (
        <MapLayerContainer className="left-2 bottom-2 py-1 px-2">
            Coordinates: {coordinates?.x ?? '--'} / {coordinates?.y ?? '--'}
        </MapLayerContainer>
    );
}