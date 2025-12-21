import useMap from '@/component/map/provider/map/use';
import {LayerGroup} from 'leaflet';
import {useEffect, useRef} from 'react';

export default function useLayerGroup(visible: boolean = true): LayerGroup {
    const map           = useMap();
    const refLayerGroup = useRef<LayerGroup>(new LayerGroup());

    useEffect(() => {
        if (visible) {
            refLayerGroup.current.addTo(map.leafletMap);
        }

        return () => void refLayerGroup.current.remove();
    }, [refLayerGroup]);

    useEffect(() => {
        if (visible) {
            refLayerGroup.current.addTo(map.leafletMap);
        }
        else {
            refLayerGroup.current.removeFrom(map.leafletMap);
        }
    }, [visible]);

    return refLayerGroup.current;
}