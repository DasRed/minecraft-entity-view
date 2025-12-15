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
            // add ids
            let result = {...prev, ...modify.add};

            // sync ids
            Object.keys(result).forEach((id) => {
                if (modify.ids.includes(id) === false) {
                    delete result[id];
                }
            });

            return result;
        });
    }, [modify]);

    return Object.values(entities);
}