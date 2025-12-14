import useWSS from '@/hook/useWSS';
import {useEffect, useState} from 'react';

interface STATISTIC_LIST_WSS_MODIFY<T = any> {
    add: Record<string, T>;
    remove: string[];
}

export default function useWSSListModify<T = any>(entitiesInitial: Record<string, T>, command: string): { entities: T[] } {
    const [entities, setEntities] = useState<Record<string, T>>(() => entitiesInitial);
    const modify                  = useWSS<STATISTIC_LIST_WSS_MODIFY<T>>(command);

    useEffect(() => {
        if (modify === null) {
            return;
        }
        setEntities((prev) => {
            let result = {...prev, ...(modify.add ?? {})};

            if (modify.remove !== null && result.length !== 0) {
                modify.remove.forEach((id) => delete result[id]);
            }
            return result;
        });
    }, [modify]);

    return {entities: Object.values(entities)};
}