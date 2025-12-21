import useDimension from '@/component/map/provider/dimension/use';
import useMap from '@/component/map/provider/map/use';
import useWSSPatch from '@/hook/useWSSPatch';
import cn from '@/lib/cn';
import getMobImageByType from '@/lib/getMobImageByType';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import {DivIcon, LayerGroup, Marker, Tooltip} from 'leaflet';
import {ReactElement, useEffect, useRef} from 'react';

interface MapMarkerEntityEntryOptionsInterface {
    entity: StatisticEntityInterface;
    layerGroup: LayerGroup;
}

export default function MapMarkerEntityEntry({entity: entityInitial, layerGroup}: MapMarkerEntityEntryOptionsInterface): ReactElement {
    const map               = useMap();
    const dimension         = useDimension();
    const entity            = useWSSPatch<StatisticEntityInterface>(entityInitial, CommandEnum.STATISTIC_PATCH_ENTITIES_ID(entityInitial.uuid));
    const refIconElement    = useRef<HTMLDivElement>(null);
    const refIcon           = useRef<DivIcon | null>(null);
    const refMarker         = useRef<Marker>(new Marker(map.toLatLng(entity.x, entity.z)));
    const refTooltipElement = useRef<HTMLDivElement>(null);
    const refTooltip        = useRef<Tooltip>(null);

    const size = 16;

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

    return (
        <div className="hidden">
            <div ref={refIconElement} style={{width: `${size}px`, height: `${size}px`}} className="shadow shadow-yellow-300/25">
                <img src={getMobImageByType(entity.displayType)} alt="" style={{width: `${size}px`, height: `${size}px`}} />
            </div>
        </div>
    );
    // return (
    //     <div ref={refTooltipElement} className="text-white flex-row font-bold">
    //         <PlayerLabel uuid={player.uuid} name={player.name} level={player.experienceLevel} isInvisible={player.isInvisible}/>
    //     </div>
    // );
}