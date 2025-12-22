import useDimension from '@/component/map/provider/dimension/use';
import useMap from '@/component/map/provider/map/use';
import PlayerLabel from '@/component/player/Label';
import useWSSPatch from '@/hook/useWSSPatch';
import MapMarkerPlayer from '@/service/map/MarkerPlayer';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import APIPlayerInterface from '@dasred/minecraft-entity-view-sdk/model/api/players/PlayerInterface';
import {Icon, LayerGroup, Tooltip} from 'leaflet';
import {ReactElement, useEffect, useRef} from 'react';

interface MapMarkerPlayerOptionsInterface {
    player: APIPlayerInterface;
    layerGroup: LayerGroup;
}

export default function MapMarkerPlayerEntry({player: playerInitial, layerGroup}: MapMarkerPlayerOptionsInterface): ReactElement {
    const map               = useMap();
    const dimension         = useDimension();
    const player            = useWSSPatch<APIPlayerInterface>(playerInitial, CommandEnum.PLAYERS_PATCH_ID(playerInitial.uuid));
    const refTooltipElement = useRef<HTMLDivElement>(null);
    const refTooltip        = useRef<Tooltip>(null);
    const refMarker         = useRef<MapMarkerPlayer>(new MapMarkerPlayer({
        rotationAngle: 180 + player.yHeadRot,
        latlng:        map.toLatLng(player.x, player.z),
        icon:          new Icon({
            iconUrl:       '/map/player.png',
            iconSize:      [17, 16],
            iconAnchor:    [8, 9],
            tooltipAnchor: [0, 0],
            className:     'bg-transparent border-none',
        }),
    }));

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
            <div ref={refTooltipElement} className="text-white flex-row font-bold">
                <PlayerLabel uuid={player.uuid} name={player.name} level={player.experienceLevel} isInvisible={player.isInvisible}/>
            </div>
        </div>
    );
}