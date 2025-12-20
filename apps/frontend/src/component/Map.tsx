import MapCoordinates from '@/component/map/Coordinates';
import MapDimensionControls from '@/component/map/DimensionControls';
import MapProvider from '@/component/map/Provider';
import MapSpawnIcon from '@/component/map/SpawnIcon';
import MapZoomControls from '@/component/map/ZoomControls';
import config from '@/config';
import useWSS from '@/hook/useWSS';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {ReactElement} from 'react';

export default function Map(): ReactElement | null {
    // const statistic = useWSS<StatisticsInterface>(CommandEnum.STATISTIC_FULL);
    // if (statistic === null) {
    //     //TODO
    // }

    const dimensions = useWSS<APIDimensionInterface[]>(CommandEnum.DIMENSIONS_FULL);
    if (dimensions === null) {
        return null;
    }

    return (
        <div className="absolute left-0 top-0 right-0 bottom-0 overflow-hidden">
            <MapProvider host={config.squaremapBackend} dimensions={dimensions}>
                <MapCoordinates/>
                <MapZoomControls/>
                <MapDimensionControls dimensions={dimensions}/>
                <MapSpawnIcon dimensions={dimensions}/>
            </MapProvider>
        </div>
    );
}