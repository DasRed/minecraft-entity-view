import useWSS from '@/hook/useWSS';
import WS_PATCH_OBJECT_LIST from '@dasred/minecraft-entity-view-sdk/model/WS_PATCH_OBJECT_LIST';
import {useEffect, useState} from 'react';

export default function useWSSObjectListPatch<T = any>(entitiesInitial: Record<string, T>, command: string): T[] {
    const [entities, setEntities] = useState<Record<string, T>>(() => entitiesInitial);
    const modify                  = useWSS<WS_PATCH_OBJECT_LIST<T>>(command);

    useEffect(() => {
        if (modify === null) {
            return;
        }
        setEntities((prev) => {
            const next: Record<string, T> = {};

            for (const id of modify.ids) {
                if (modify.add[id]) {
                    next[id] = modify.add[id];
                }
                else if (prev[id]) {
                    next[id] = prev[id];
                }
            }

            return next;
        });
    }, [modify]);

    return Object.values(entities);
}