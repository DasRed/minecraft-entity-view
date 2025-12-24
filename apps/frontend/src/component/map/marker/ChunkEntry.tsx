import useDimension from '@/component/map/provider/dimension/use';
import useMap from '@/component/map/provider/map/use';
import useWSSPatch from '@/hook/useWSSPatch';
import cn from '@/lib/cn';
import ChunkStatusEnum from '@dasred/minecraft-entity-view-sdk/constant/ChunkStatusEnum';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import APIChunkInterface from '@dasred/minecraft-entity-view-sdk/model/api/ChunkInterface';
import {DivIcon, LayerGroup, Marker} from 'leaflet';
import {ReactElement, useEffect, useRef, useState} from 'react';

interface MapMarkerChunkEntryOptionsInterface {
    chunk: APIChunkInterface;
    layerGroup: LayerGroup;
}

export default function MapMarkerChunkEntry({chunk: chunkInitial, layerGroup}: MapMarkerChunkEntryOptionsInterface): ReactElement {
    const map               = useMap();
    const dimension         = useDimension();
    const [scale, setScale] = useState<number>(Math.pow(2, map.leafletMap.getZoom() - map.zoomInitial));
    const chunk             = useWSSPatch<APIChunkInterface>(chunkInitial, CommandEnum.CHUNKS_ACTIVE_ID(chunkInitial.id));
    const refIconElement    = useRef<HTMLDivElement>(null);
    const refIcon           = useRef<DivIcon | null>(null);
    const refMarker         = useRef<Marker>(new Marker(map.toLatLng(chunk.position.min.x, chunk.position.min.z), {
        interactive: false,
        keyboard:    false,
    }));

    const size = 16;

    useEffect(() => {
        if (refIconElement.current === null || refIcon.current !== null) {
            return;
        }

        refIcon.current = new DivIcon({
            html:       refIconElement.current,
            iconSize:   [size, size],
            iconAnchor: [0, 0],
            // tooltipAnchor: [0, 0],
            className: 'bg-transparent border-none opacity-25',
        });

        refMarker.current.setIcon(refIcon.current);

        map.leafletMap.on('zoom', (event) => setScale(Math.pow(2, event.target._zoom - map.zoomInitial)), refIconElement.current);
        return () => void map.leafletMap.off('zoom', undefined, refIconElement.current);
    }, []);

    useEffect(() => {
        if (dimension.id === chunk.dimension) {
            refMarker.current.addTo(layerGroup);
        }
        else {
            // @ts-ignore
            refMarker.current.removeFrom(layerGroup);
        }

        // @ts-ignore
        return () => void refMarker.current?.removeFrom(layerGroup);
    }, [dimension.id, chunk.dimension, layerGroup]);

    return (
        <div className="hidden">
            <div
                ref={refIconElement}
                data-id={chunk.id}
                style={{width: `${size * scale}px`, height: `${size * scale}px`}}
                className={cn('flex flex-col items-center transition-all', {
                    'bg-fuchsia-400':    chunk.status === ChunkStatusEnum.UNKNOWN,
                    'bg-red-500':    chunk.status === ChunkStatusEnum.INACCESSIBLE,
                    'bg-orange-500': chunk.status === ChunkStatusEnum.FULL,
                    'bg-yellow-500': chunk.status === ChunkStatusEnum.BLOCK_TICKING,
                    'bg-green-500':  chunk.status === ChunkStatusEnum.ENTITY_TICKING,
                })}
            >
            </div>
        </div>
    );
}