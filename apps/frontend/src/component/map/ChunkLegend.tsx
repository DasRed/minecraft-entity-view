import cn from '@/lib/cn';
import ChunkStatusEnum from '@dasred/minecraft-entity-view-sdk/constant/ChunkStatusEnum';
import {ReactElement} from 'react';

const LegendEntries = [
    {className: 'bg-green-500/25', status: ChunkStatusEnum.ENTITY_TICKING, text: 'Full active'},
    {className: 'bg-yellow-500/25', status: ChunkStatusEnum.BLOCK_TICKING, text: 'Redstone'},
    {className: 'bg-orange-500/25', status: ChunkStatusEnum.FULL, text: 'Inactive'},
    {className: 'bg-gray-500/25', status: ChunkStatusEnum.INACCESSIBLE, text: 'Unloaded'},
];

export default function MapChunkLegend(): ReactElement {
    return (
        <div className="border border-gray-600 bg-white/75 rounded text-sm py-1 px-2 flex flex-row gap-2 items-center">
            <div className="pr-2">Chunk Legend</div>

            {LegendEntries.map((entry) =>
                <div key={entry.status} data-chunk-status={entry.status} className={cn('border border-gray-600 px-1 py-0.5 rounded', entry.className)}>
                    {entry.text}
                </div>,
            )}
        </div>
    );
}