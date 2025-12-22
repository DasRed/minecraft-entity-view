import MapProviderDimension from '@/component/map/provider/dimension/Provider';
import MapProviderDimensions from '@/component/map/provider/dimensions/Provider';
import MapContextMap from '@/component/map/provider/map/Context';
import useWSS from '@/hook/useWSS';
import cn from '@/lib/cn';
import setting from '@/lib/setting';
import Map from '@/service/Map';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {PropsWithChildren, ReactNode, useEffect, useRef, useState} from 'react';

interface MapProviderMapOptionsInterface {
    host: string;
    className?: string;
    children: ReactNode;
}

export default function MapProviderMap({host, className, children}: PropsWithChildren<MapProviderMapOptionsInterface>) {
    const dimensions        = useWSS<APIDimensionInterface[]>(CommandEnum.DIMENSIONS_FULL);
    const containerRef      = useRef<HTMLDivElement>(null);
    const mapRef            = useRef<Map | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (dimensions === null || containerRef.current === null || mapRef.current !== null) {
            return;
        }

        mapRef.current = new Map({
            element:     containerRef.current,
            dimensions,
            dimensionId: setting.get('dimension', DimensionEnum.OVERWORLD),
            urlTemplate: `${host}/tiles/{dimensionId}/{z}/{x}_{y}.png`,

            zoomMax: 8,
        });

        mapRef.current.leafletMap.whenReady(() => setReady(true));

        return () => {
            mapRef.current?.destroy();
            mapRef.current = null;
            setReady(false);
        };
    }, [host, dimensions, containerRef]);

    return (
        <>
            <div ref={containerRef} className={cn('bg-transparent! absolute inset-0 z-1', className)}/>

            {ready && dimensions !== null && containerRef.current && (
                <MapContextMap.Provider value={mapRef.current}>
                    <MapProviderDimensions dimensions={dimensions}>
                        <MapProviderDimension>
                            {children}
                        </MapProviderDimension>
                    </MapProviderDimensions>
                </MapContextMap.Provider>
            )}
        </>
    );
}