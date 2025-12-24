import ChunkStatusEnum from '@dasred/minecraft-entity-view-sdk/constant/ChunkStatusEnum';
import {ReactElement} from 'react';

export default function MapChunkLegend(): ReactElement {
    return (
        <div className="border border-gray-600 bg-white/75 rounded text-sm py-1 px-2 flex flex-row gap-2 items-center">
            <div className="pr-2">Legend</div>
            <div data-chunk-status={ChunkStatusEnum.ENTITY_TICKING} className="border border-gray-600 bg-green-500/25 px-1 py-0.5 rounded">Full active</div>
            <div data-chunk-status={ChunkStatusEnum.BLOCK_TICKING} className="border border-gray-600 bg-yellow-500/25 px-1 py-0.5 rounded">Redstone</div>
            <div data-chunk-status={ChunkStatusEnum.FULL} className="border border-gray-600 bg-orange-500/25 px-1 py-0.5 rounded">Inactive</div>
            <div data-chunk-status={ChunkStatusEnum.INACCESSIBLE} className="border border-gray-600 bg-red-500/25 px-1 py-0.5 rounded">Unloaded</div>
        </div>
    );
}