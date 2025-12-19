import useWSS from '@/hook/useWSS';
import wssStore from '@/lib/wssStore';
import CommandEnum from '@dasred/minecraft-entity-view-sdk/constant/CommandEnum';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import WebsocketPatchObjectList from '@dasred/minecraft-entity-view-sdk/model/WebsocketPatchObjectList';
import {useEffect, useState} from 'react';

export default function useWSSObjectListPatch<T = any>(initial: Record<string, T>, command: CommandType): T[] {
    const patch                  = useWSS<WebsocketPatchObjectList<T>>(command);
    const [entities, setEntities] = useState<Record<CommandType, T>>(initial);

    useEffect(() => {
        if (patch === null) {
            return;
        }
        setEntities((prev) => {
            const next: Record<CommandType, T> = {};

            for (const id of patch.ids) {
                if (patch.add[id]) {
                    next[id] = patch.add[id];
                }
                else if (prev[id]) {
                    next[id] = prev[id];
                }
            }

            patch.remove.forEach((id) => wssStore.delete(CommandEnum.STATISTIC_PATCH_ENTITIES_ID(id)));
            return next;
        });
    }, [patch]);

    return Object.values(entities);
}