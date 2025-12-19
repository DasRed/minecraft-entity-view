import config from '@/config';
import useWSS from '@/hook/useWSS';
import SquaremapMap from '@/squaremap/Map';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {Point} from 'leaflet';
import {ReactElement, useEffect, useRef, useState} from 'react';

export default function Map(): ReactElement | null {
    const [coordinates, setCoordinates] = useState<Point | null>(null);
    const refMap                        = useRef<HTMLDivElement>(null);
    const refSquaremap                  = useRef<SquaremapMap | null>(null);

    const statistic = useWSS<StatisticsInterface>(CommandEnum.STATISTIC_FULL);
    if (statistic === null) {
        //TODO
    }

    useEffect(() => {
        if (refMap.current === null) {
            return;
        }

        refSquaremap.current = new SquaremapMap({
            element:             refMap.current,
            host:                config.squaremapBackend,
            centerOn:            {x: 0, z: 0},
            onUpdateCoordinates: setCoordinates,
        });

        return () => void refSquaremap.current?.destroy();
    }, []);

    return (
        <div className="absolute left-0 top-0 right-0 bottom-0 bg-fuchsia-400 overflow-hidden">
            <div ref={refMap} className="left-0 top-0 w-full h-full z-10"></div>
            <div className="absolute left-2 bottom-2 z-20 py-1 px-2 border-gray-600 bg-white/75 rounded text-sm">
                Coordinates: {coordinates?.x ?? '--'} / {coordinates?.y ?? '--'}
            </div>
        </div>
    );
}