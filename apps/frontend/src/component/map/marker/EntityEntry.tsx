import useDimension from '@/component/map/provider/dimension/use';
import useMap from '@/component/map/provider/map/use';
import PlayerLabel from '@/component/player/Label';
import useWSSPatch from '@/hook/useWSSPatch';
import MapMarkerPlayer from '@/service/map/MarkerPlayer';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import APIPlayerInterface from '@dasred/minecraft-entity-view-sdk/model/api/players/PlayerInterface';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import {Icon, LayerGroup, Tooltip} from 'leaflet';
import {ReactElement, useEffect, useRef} from 'react';

interface MapMarkerEntityEntryOptionsInterface {
    entity: StatisticEntityInterface;
    layerGroup: LayerGroup;
}

export default function MapMarkerEntityEntry({entity: entityInitial, layerGroup}: MapMarkerEntityEntryOptionsInterface): ReactElement {
    const map               = useMap();
    const dimension         = useDimension();
    const entity = useWSSPatch<StatisticEntityInterface>(entityInitial, CommandEnum.STATISTIC_PATCH_ENTITIES_ID(entityInitial.uuid));

    return <></>;
    // return (
    //     <div ref={refTooltipElement} className="text-white flex-row font-bold">
    //         <PlayerLabel uuid={player.uuid} name={player.name} level={player.experienceLevel} isInvisible={player.isInvisible}/>
    //     </div>
    // );
}