import MapContext from '@/context/MapContext';
import cn from '@/lib/cn';
import SquaremapMap from '@/squaremap/Map';
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
    const mapRef            = useRef<SquaremapMap | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (containerRef.current === null || mapRef.current !== null) {
            return;
        }

        mapRef.current = new SquaremapMap({
            element:  containerRef.current,
            host,
            dimensions,
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
            <div ref={containerRef} className={cn('absolute inset-0 z-1', className)}/>

            {ready && containerRef.current && (
                <MapContext.Provider value={mapRef.current}>
                    <div className="absolute inset-0 z-2 pointer-events-none">
                        {children}
                    </div>
                </MapContext.Provider>
            )}
        </>
    );
}