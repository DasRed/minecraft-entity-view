import ContourImage from '@/component/ContourImage';
import Coordinates from '@/component/Coordinates';
import useDimension from '@/component/map/provider/dimension/use';
import useMap from '@/component/map/provider/map/use';
import useWSSPatch from '@/hook/useWSSPatch';
import MapMarkerPlayer from '@/service/map/MarkerPlayer';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import APIPlayerInterface from '@dasred/minecraft-entity-view-sdk/model/api/players/PlayerInterface';
import {DivIcon, LayerGroup, Tooltip} from 'leaflet';
import {LucideMapPin} from 'lucide-react';
import {ReactElement, useEffect, useRef} from 'react';

interface MapMarkerPlayerEntryOptionsInterface {
    player: APIPlayerInterface;
    layerGroup: LayerGroup;
}

export default function MapMarkerPlayerEntry({player: playerInitial, layerGroup}: MapMarkerPlayerEntryOptionsInterface): ReactElement {
    const map               = useMap();
    const dimension         = useDimension();
    const player            = useWSSPatch<APIPlayerInterface>(playerInitial, CommandEnum.PLAYERS_PATCH_ID(playerInitial.uuid));
    const refIconElement    = useRef<HTMLDivElement>(null);
    const refIcon           = useRef<DivIcon | null>(null);
    const refTooltipElement = useRef<HTMLDivElement>(null);
    const refTooltip        = useRef<Tooltip>(null);
    const refMarker         = useRef<MapMarkerPlayer>(new MapMarkerPlayer({
        rotationAngle: 180 + player.yHeadRot,
        latlng:        map.toLatLng(player.x, player.z),
        anchor:        [8, 8],
    }));

    const size = 16;

    useEffect(() => {
        if (refIconElement.current === null || refIcon.current !== null || refTooltipElement === null || refTooltip.current !== null) {
            return;
        }

        refIcon.current = new DivIcon({
            html:          refIconElement.current,
            iconSize:      [size + 4, size + 4],
            iconAnchor:    [(size + 4 )/ 2, (size + 4) / 2],
            tooltipAnchor: [0, 0],
            className:     'bg-transparent border-none',
        });

        refMarker.current.setIcon(refIcon.current);
    }, []);

    useEffect(() => {
        if (dimension.id === player.dimension) {
            refMarker.current.addTo(layerGroup);
        }
        else {
            // @ts-ignore
            refMarker.current.removeFrom(layerGroup);
        }

        // @ts-ignore
        return () => void refMarker.current?.removeFrom(layerGroup);
    }, [dimension.id, player.dimension, layerGroup]);

    useEffect(() => {
        refMarker.current.updateView(map.toLatLng(player.x, player.z), 180 + player.yHeadRot);
    }, [player.x, player.z, player.yHeadRot]);

    useEffect(() => {
        if (refTooltipElement === null || refTooltip.current !== null) {
            refTooltip.current?.update();
            return;
        }

        refTooltip.current = new Tooltip({
            permanent: true,
            direction: 'right',
            offset:    [5, 0],
            content:   refTooltipElement.current!,
            className: 'bg-black/90! border-gray-500/85! before:content-none! rounded!',
        });

        refMarker.current.bindTooltip(refTooltip.current);

        return () => {
            refTooltip.current?.remove();
            refTooltip.current = null;
        };
    }, []);

    return (
        <div className="hidden">
            <div
                ref={refIconElement}
                data-uuid={player.uuid}
                data-x={Math.floor(player.x)}
                data-y={Math.floor(player.y)}
                data-z={Math.floor(player.z)}
                style={{width: `${size + 4}px`, height: `${size + 4}px`}}
                className="flex flex-col items-center"
            >
                <div className="w-0 h-0 border-l-transparent border-l-4 border-r-transparent border-r-4 border-b-4 border-b-teal-400" />
                <ContourImage src={`https://mc-heads.net/avatar/${player.uuid}/${size}`} width={size} height={size}/>
            </div>

            <div ref={refTooltipElement} className="text-white flex-row">
                <div
                    ref={refTooltipElement}
                    data-uuid={player.uuid}
                    className="text-white flex-row w-max flex gap-1 items-start flex-nowrap font-sans text-sm leading-4 pointer-events-auto"
                >
                    <img src={`https://mc-heads.net/avatar/${player.uuid}/${size}`} alt="" className="w-8 h-8"/>
                    <div className="flex flex-col">
                        <div className="font-bold">{player.name}</div>
                        <div className="text-gray-300 flex flex-row gap-1 items-center">
                            <LucideMapPin className="w-3 h-3"/> <Coordinates x={player.x} y={player.y} z={player.z}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}