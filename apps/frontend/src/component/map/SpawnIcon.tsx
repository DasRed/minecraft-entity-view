import MapLayerContainer from '@/component/map/LayerContainer';
import useDimension from '@/component/map/useDimension';
import useMap from '@/component/map/useMap';
import cn from '@/lib/cn';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {DivIcon, Layer, LayerGroup, Marker} from 'leaflet';
import {LucideMapPin} from 'lucide-react';
import {ReactElement, useEffect, useRef, useState} from 'react';

interface MapSpawnIconOptionsInterface {
    dimensions: APIDimensionInterface[];
}

export default function MapSpawnIcon({dimensions}: MapSpawnIconOptionsInterface): ReactElement {
    const map                       = useMap();
    const {dimension}               = useDimension(dimensions);
    const [showSpawn, setShowSpawn] = useState<boolean>(false);
    const refIcon                   = useRef<HTMLDivElement>(null);
    const refLayer                  = useRef<Layer>(null);

    useEffect(() => {
        if (refIcon.current === null) {
            return;
        }

        if (refLayer.current !== null) {
            refLayer.current.remove();
        }

        const icon = new Marker(map.toLatLng(dimension.spawn.x, dimension.spawn.z), {
            icon: new DivIcon({
                html:       refIcon.current,
                iconSize:   [24, 24],
                iconAnchor: [12, 24],
                className:  'bg-transparent border-none',
            }),
        });

        refLayer.current = (new LayerGroup([icon])).addTo(map.leafletMap);
    }, [refLayer, dimension]);

    return (
        <>
            <div ref={refIcon} className={cn('bg-transparent border-none transition-opacity opacity-100', {'opacity-0': showSpawn === false})}>
                <LucideMapPin absoluteStrokeWidth={true} strokeWidth={3} className="w-6 h-6 text-fuchsia-400"/>
            </div>
            <MapLayerContainer className="left-2 top-24 flex flex-col gap-1 items-center overflow-hidden transition-all w-8 hover:w-30">
                <div
                    onClick={() => setShowSpawn(!showSpawn)}
                    className={cn('flex flex-row flex-nowrap items-center text-nowrap w-full pl-2 py-1 cursor-pointer transition-all', {
                        'grayscale-100 opacity-50 hover:grayscale-0 hover:opacity-100 hover:bg-orange-400/50': showSpawn === false,
                        'grayscale-0 opacity-100 hover:grayscale-100 hover:opacity-50 hover:bg-orange-400/50': showSpawn === true,
                    })}
                >
                    <img src="/map/spawn.png" alt=""/>
                    <span className="ml-2">Spawn</span>
                </div>
            </MapLayerContainer>
        </>
    );
}