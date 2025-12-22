import ContourImage, {ContourType} from '@/component/ContourImage';
import useDimension from '@/component/map/provider/dimension/use';
import useMap from '@/component/map/provider/map/use';
import useWSSPatch from '@/hook/useWSSPatch';
import getMobImageByType from '@/lib/getMobImageByType';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import {DivIcon, LayerGroup, Marker, Tooltip} from 'leaflet';
import {LucideClock, LucideMapPin} from 'lucide-react';
import {Duration} from 'luxon';
import {ReactElement, useEffect, useRef, useState} from 'react';

interface MapMarkerEntityEntryOptionsInterface {
    entity: StatisticEntityInterface;
    layerGroup: LayerGroup;
}

const DURATION_ALIVE_WARNING = 30 * 60 * 1000;

export default function MapMarkerEntityEntry({entity: entityInitial, layerGroup}: MapMarkerEntityEntryOptionsInterface): ReactElement {
    const [durationAlive, setDurationAlive]                               = useState(Date.now() - entityInitial.stats.firstSeen);
    const [tooltipIsPermanent, setTooltipIsPermanent] = useState(false);
    const map                                         = useMap();
    const dimension                                   = useDimension();
    const entity                                      = useWSSPatch<StatisticEntityInterface>(entityInitial, CommandEnum.STATISTIC_PATCH_ENTITIES_ID(entityInitial.uuid));
    const refIconElement                              = useRef<HTMLDivElement>(null);
    const refIcon                                     = useRef<DivIcon | null>(null);
    const refMarker                                   = useRef<Marker>(new Marker(map.toLatLng(entity.x, entity.z)));
    const refTooltipElement                           = useRef<HTMLDivElement>(null);
    const refTooltip                                  = useRef<Tooltip>(null);

    const size = 16;

    useEffect(() => {
        if (refIconElement.current === null || refIcon.current !== null || refTooltipElement === null || refTooltip.current !== null) {
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

        refTooltip.current = new Tooltip({
            direction: 'right',
            offset:    [5, 0],
            content:   refTooltipElement.current!,
            className: 'bg-black/90! border-gray-500/85! before:content-none! rounded!',
        });

        refMarker.current.bindTooltip(refTooltip.current);
        const interval = setInterval(() => setDurationAlive(Date.now() - entity.stats.firstSeen), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (dimension.id === entity.dimension && entity.stats.isDeleted === false) {
            refMarker.current.addTo(layerGroup);
        }
        else {
            // @ts-ignore
            refMarker.current.removeFrom(layerGroup);
        }

        // @ts-ignore
        return () => void refMarker.current?.removeFrom(layerGroup);
    }, [dimension.id, entity.dimension, layerGroup, entity.stats.isDeleted]);

    useEffect(() => {
        refMarker.current.setLatLng(map.toLatLng(entity.x, entity.z));
    }, [entity.x, entity.z]);

    useEffect(() => {
        refMarker.current?.unbindTooltip();
        refTooltip.current?.remove();

        refTooltip.current = new Tooltip({
            permanent: tooltipIsPermanent,
            direction: 'right',
            offset:    [5, 0],
            content:   refTooltipElement.current!,
            className: 'bg-black/90! border-gray-500/85! before:content-none! rounded!',
        });
        refMarker.current.bindTooltip(refTooltip.current);
    }, [tooltipIsPermanent]);

    return (
        <div className="hidden">
            <div
                ref={refIconElement}
                data-uuid={entity.uuid}
                data-type={entity.displayType}
                data-x={Math.floor(entity.x)}
                data-y={Math.floor(entity.y)}
                data-z={Math.floor(entity.z)}
                style={{width: `${size}px`, height: `${size}px`}}
                onClick={() => setTooltipIsPermanent(!tooltipIsPermanent)}
            >
                <ContourImage src={getMobImageByType(entity.displayType)} type={durationAlive < DURATION_ALIVE_WARNING ? ContourType.DEFAULT : ContourType.ERROR} width={size} height={size}/>
            </div>
            <div ref={refTooltipElement} className="text-white flex-row w-max flex gap-1 items-start justify-center flex-nowrap font-sans text-sm leading-4">
                <img src={getMobImageByType(entity.displayType)} alt="" className="w-8 h-8"/>
                <div className="flex flex-col">
                    <div className="font-bold">{entity.displayName}</div>
                    <div className="text-gray-300 flex flex-row gap-1 items-center">
                        <LucideMapPin className="w-3 h-3"/> <span>{Math.floor(entity.x)} / {Math.floor(entity.y)} / {Math.floor(entity.z)}</span>
                    </div>
                    <div className="text-gray-300 flex flex-row gap-1 items-center">
                        <LucideClock className="w-3 h-3"/> <span>{Duration.fromMillis(durationAlive).toFormat('hh:mm:ss')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}