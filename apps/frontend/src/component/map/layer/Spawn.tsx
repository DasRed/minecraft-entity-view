import useLayerGroup from '@/component/map/hook/useLayerGroup';
import useDimension from '@/component/map/provider/dimension/use';
import useMap from '@/component/map/provider/map/use';
import cn from '@/lib/cn';
import {DivIcon, Marker} from 'leaflet';
import {LucideMapPin} from 'lucide-react';
import {ReactElement, useEffect, useRef} from 'react';

interface MapLayerSpawnOptionsInterface {
    visible: boolean;
}

export default function MapLayerSpawn({visible}: MapLayerSpawnOptionsInterface): ReactElement {
    const map        = useMap();
    const layerGroup = useLayerGroup(visible);
    const dimension  = useDimension();
    const refIcon    = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (refIcon.current === null) {
            return;
        }

        const icon = new Marker(map.toLatLng(dimension.spawn.x, dimension.spawn.z), {
            icon: new DivIcon({
                html:       refIcon.current,
                iconSize:   [24, 24],
                iconAnchor: [12, 24],
                className:  'bg-transparent border-none',
            }),
        });

        icon.addTo(layerGroup);
    }, [layerGroup, dimension]);

    return (
        <div ref={refIcon} className={cn('bg-transparent border-none transition-opacity opacity-100 pointer-events-none', {'hidden': visible === false})}>
            <LucideMapPin absoluteStrokeWidth={true} strokeWidth={3} className="w-6 h-6 text-fuchsia-400"/>
        </div>
    );
}
