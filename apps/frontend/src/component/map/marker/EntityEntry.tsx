import ContourImage, {ContourType} from '@/component/ContourImage';
import MapEntityTooltip from '@/component/map/EntityTooltip';
import useDimension from '@/component/map/provider/dimension/use';
import useMap from '@/component/map/provider/map/use';
import config from '@/config';
import MapMarkerPlayer, {MapMarkerPlayerOptionsInterface} from '@/service/map/MarkerPlayer';
import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import {DivIcon, LatLngExpression, LeafletEvent, Marker, MarkerOptions} from 'leaflet';
import {ReactElement, useCallback, useEffect, useRef, useState} from 'react';

interface MapMarkerEntityEntryOptionsInterface {
    uuid: string;
    type: string;
    name: string;
    dimension: DimensionEnum;
    x: number;
    y: number;
    z: number;
    yHeadRot?: number;
    image: string;
    bornAtTimestamp?: number;
    visible: boolean;
    isDeleted?: boolean;
    onClickKill?: () => void;
    markerConstructor:
        (new(latlng: LatLngExpression, options?: MarkerOptions) => Marker) |
        (new(latlng: LatLngExpression, options: MapMarkerPlayerOptionsInterface) => MapMarkerPlayer);
}

function calcScale(current: number, initial: number, factor: number = 0.125): number {
    return  Math.pow(2, (current - initial) * factor);
}

export default function MapMarkerEntityEntry({uuid, type, name, dimension, x, y, z, yHeadRot, image, bornAtTimestamp, visible, isDeleted = false, onClickKill, markerConstructor}: MapMarkerEntityEntryOptionsInterface): ReactElement {
    const map               = useMap();
    const dimensionSelected = useDimension();

    const [durationAlive, setDurationAlive]           = useState(Date.now() - (bornAtTimestamp ?? 0));
    const [tooltipIsPermanent, setTooltipIsPermanent] = useState(false);

    const refIconElement = useRef<HTMLDivElement>(null);
    const refIcon        = useRef<DivIcon | null>(null);
    const refMarker      = useRef<Marker | MapMarkerPlayer>(new markerConstructor(map.toLatLng(x, z), {
        rotationAngle: 180 + (yHeadRot ?? 0),
        anchor:        [8, 8],
    }));

    const [scale, setScale] = useState<number>(calcScale(map.leafletMap.getZoom(), map.zoomInitial));
    const size              = 16 * scale;

    const zoomEvent = useCallback((event: LeafletEvent) => {
        setScale(calcScale(event.target._zoom, map.zoomInitial));
        if (refIconElement.current === null || refIcon.current === null) {
            return;
        }

        refIcon.current = new DivIcon({
            html:          refIconElement.current,
            iconSize:      [size, size],
            iconAnchor:    [size / 2, size / 2],
            tooltipAnchor: [0, 0],
            className:     'bg-transparent border-none',
        });
    }, [scale]);

    useEffect(() => {
        if (refIconElement.current === null || refIcon.current !== null) {
            return;
        }

        refIcon.current = new DivIcon({
            html:          refIconElement.current,
            iconSize:      [size, size],
            iconAnchor:    [size / 2, size / 2],
            tooltipAnchor: [0, 0],
            className:     'bg-transparent border-none',
        });

        refMarker.current.setIcon(refIcon.current);
        const interval = bornAtTimestamp ? setInterval(() => setDurationAlive(Date.now() - bornAtTimestamp), 1000) : undefined;
        map.leafletMap.on('zoom', zoomEvent, refIcon.current);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
            map.leafletMap.off('zoom', zoomEvent, refIcon.current);
        };
    }, []);

    useEffect(() => {
        refMarker.current.setLatLng(map.toLatLng(x, z));
    }, [x, z]);

    useEffect(() => {
        if (yHeadRot !== undefined && refMarker.current instanceof MapMarkerPlayer) {
            refMarker.current.setRotationAngle(180 + yHeadRot);
        }
    }, [yHeadRot]);

    useEffect(() => {
        if (dimensionSelected.id === dimension && isDeleted === false && visible === true) {
            refMarker.current.addTo(map.leafletMap);
        }
        else {
            refMarker.current.removeFrom(map.leafletMap);
        }

        return () => void refMarker?.current.removeFrom(map.leafletMap);
    }, [map, visible, tooltipIsPermanent, dimensionSelected.id, dimension, isDeleted]);

    return (
        <div className="hidden">
            <div
                ref={refIconElement}
                data-uuid={uuid}
                data-type={type}
                data-x={Math.floor(x)}
                data-y={Math.floor(y)}
                data-z={Math.floor(z)}
                className="flex flex-col items-center"
                style={{width: `${size + (yHeadRot !== undefined ? 4 : 0)}px`, height: `${size + (yHeadRot !== undefined ? 4 : 0)}px`}}
                onClick={() => setTooltipIsPermanent(!tooltipIsPermanent)}
                onDoubleClick={() => onClickKill?.()}
            >
                {yHeadRot !== undefined && <div className="w-0 h-0 border-l-transparent border-l-4 border-r-transparent border-r-4 border-b-4 border-b-teal-400"/>}

                <ContourImage src={image} type={bornAtTimestamp === undefined || durationAlive < config.entity.highlightIfOlderThan ? ContourType.DEFAULT : ContourType.ERROR} width={size} height={size}/>
            </div>

            {refMarker.current &&
                <MapEntityTooltip
                    marker={refMarker.current}
                    name={name}
                    image={image}
                    x={x}
                    y={y}
                    z={z}
                    durationAlive={bornAtTimestamp ? durationAlive : undefined}
                    onClickKill={onClickKill}
                    permanent={tooltipIsPermanent}
                />
            }
        </div>
    );
}