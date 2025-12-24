import MapControlToggleIcon from '@/component/map/control/ToggleIcon';
import useLayerGroup from '@/component/map/hook/useLayerGroup';
import MapMarkerChunkEntry from '@/component/map/marker/ChunkEntry';
import useWSSObjectListPatch from '@/hook/useWSSObjectListPatch';
import setting from '@/lib/setting';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import APIChunkInterface from '@dasred/minecraft-entity-view-sdk/model/api/ChunkInterface';
import APIChunkListInterface from '@dasred/minecraft-entity-view-sdk/model/api/ChunkListInterface';
import {ReactElement, useEffect} from 'react';

interface MapControlChunkStatusOptionsInterface {
    isActive: boolean;
    setIsActive: (value: boolean) => void;
    chunksActive: APIChunkListInterface;
}

export default function MapControlChunkStatus({isActive, setIsActive, chunksActive: chunksActiveInitial}: MapControlChunkStatusOptionsInterface): ReactElement {
    const chunksActive = useWSSObjectListPatch<APIChunkInterface>(chunksActiveInitial, CommandEnum.CHUNKS_ACTIVE_LIST);
    const layerGroup   = useLayerGroup(isActive);

    useEffect(() => void setting.set('chunk.status', isActive), [isActive]);

    return (
        <>
            <MapControlToggleIcon title="Chunk Status" icon="/map/chunkStatus/32x32.png" onToggle={setIsActive} active={isActive}/>
            <div className="hidden">
                {chunksActive.map((chunk) => <MapMarkerChunkEntry key={chunk.id} layerGroup={layerGroup} chunk={chunk}/>)}
            </div>
        </>
    );
}