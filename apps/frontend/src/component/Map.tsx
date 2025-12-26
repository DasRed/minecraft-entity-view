import MapChunkLegend from '@/component/map/ChunkLegend';
import MapChunkPosition from '@/component/map/ChunkPosition';
import MapControlBlendTiles from '@/component/map/control/BlendTiles';
import MapControlChunkStatus from '@/component/map/control/ChunkStatus';
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
import setting from '@/lib/setting';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import APIChunkListInterface from '@dasred/minecraft-entity-view-sdk/model/api/ChunkListInterface';
import APIPlayersInterface from '@dasred/minecraft-entity-view-sdk/model/api/PlayersInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {ReactElement, useState} from 'react';

export default function Map(): ReactElement | null {
    const [isChunkStatusActive, setIsChunkStatusActive] = useState<boolean>(setting.get('chunk.status', false));

    const statistic    = useWSS<StatisticsInterface>(CommandEnum.STATISTIC_FULL);
    const players      = useWSS<APIPlayersInterface>(CommandEnum.PLAYERS_FULL);
    const chunksActive = useWSS<APIChunkListInterface>(CommandEnum.CHUNKS_ACTIVE_FULL);
    if (players === null || statistic === null || chunksActive === null) {
        return null;
    }

    return (
        <div className="absolute left-0 top-0 right-0 bottom-0 overflow-hidden">
            <MapProviderMap tileLayerServer={config.tileLayerServer}>
                <DimensionBackground/>
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute z-2 left-16 top-2 pointer-events-none flex flex-row gap-3">
                        <MapCoordinates/>
                        <MapChunkPosition/>
                    </div>

                    {isChunkStatusActive && <div className="absolute z-2 right-2 top-2 flex flex-col gap-3 items-start pointer-events-none">
                        <MapChunkLegend/>
                    </div>}

                    <div className="absolute z-2 left-2 top-2 flex flex-col gap-3 items-start pointer-events-none">
                        <MapControlContainer expandable={false}>
                            <MapControlZoom/>
                        </MapControlContainer>

                        <MapControlContainer>
                            <MapControlDimension/>
                        </MapControlContainer>

                        <MapControlContainer>
                            <MapControlSpawnIcon/>
                            <MapControlBlendTiles/>
                            <MapControlChunkStatus isActive={isChunkStatusActive} setIsActive={setIsChunkStatusActive} chunksActive={chunksActive}/>
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