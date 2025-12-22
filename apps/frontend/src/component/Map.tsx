import MapControlBlendTiles from '@/component/map/control/BlendTiles';
import MapControlContainer from '@/component/map/control/Container';
import MapControlDimension from '@/component/map/control/Dimension';
import MapControlEntities from '@/component/map/control/Entities';
import MapControlSpawnIcon from '@/component/map/control/SpawnIcon';
import MapControlZoom from '@/component/map/control/Zoom';
import MapCoordinates from '@/component/map/Coordinates';
import DimensionBackground from '@/component/map/DimensionBackground';
import MapProviderMap from '@/component/map/provider/map/Provider';
import config from '@/config';
import useWSS from '@/hook/useWSS';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import APIPlayersInterface from '@dasred/minecraft-entity-view-sdk/model/api/PlayersInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {ReactElement} from 'react';

export default function Map(): ReactElement | null {
    const statistic = useWSS<StatisticsInterface>(CommandEnum.STATISTIC_FULL);
    const players   = useWSS<APIPlayersInterface>(CommandEnum.PLAYERS_FULL);
    if (players === null || statistic === null) {
        return null;
    }

    return (
        <div className="absolute left-0 top-0 right-0 bottom-0 overflow-hidden">
            <MapProviderMap host={config.squaremapBackend}>
                <DimensionBackground/>
                <div className="absolute inset-0 pointer-events-none">
                    <MapCoordinates/>
                    <div className="absolute z-2 left-2 top-2 flex flex-col gap-3 items-start text-sm pointer-events-none">
                        <MapControlContainer expandable={false}>
                            <MapControlZoom/>
                        </MapControlContainer>

                        <MapControlContainer>
                            <MapControlDimension/>
                        </MapControlContainer>

                        <MapControlContainer>
                            <MapControlSpawnIcon/>
                            <MapControlBlendTiles/>
                        </MapControlContainer>

                        <MapControlContainer>
                            <MapControlEntities players={players} statistic={statistic}/>
                        </MapControlContainer>
                    </div>
                </div>
            </MapProviderMap>
        </div>
    );
}