import MapContext from '@/component/map/Context';
import cn from '@/lib/cn';
import Map from '@/service/Map';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {PropsWithChildren, ReactNode, useEffect, useRef, useState} from 'react';

interface MapProviderOptionsInterface {
    host: string;
    className?: string;
    children: ReactNode;
    dimensions: APIDimensionInterface[];
}

export default function MapProvider({host, dimensions, className, children}: PropsWithChildren<MapProviderOptionsInterface>) {
    const containerRef      = useRef<HTMLDivElement>(null);
    const mapRef            = useRef<Map | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (containerRef.current === null || mapRef.current !== null) {
            return;
        }

        mapRef.current = new Map({
            element:     containerRef.current,
            dimensions,
            urlTemplate: `${host}/tiles/{dimensionId}/{z}/{x}_{y}.png`,
        });

        setReady(true);

        return () => {
            mapRef.current?.destroy();
            mapRef.current = null;
            setReady(false);
        };
    }, [host, containerRef]);

    return (
        <>
            <div ref={containerRef} className={cn('bg-transparent! absolute inset-0 z-1', className)}/>

            {ready && containerRef.current && (
                <MapContext.Provider value={mapRef.current}>
                    {children}
                </MapContext.Provider>
            )}
        </>
    );
}