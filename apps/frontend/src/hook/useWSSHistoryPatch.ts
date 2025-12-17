import useWSS from '@/hook/useWSS';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import {useEffect, useState} from 'react';

export default function useWSSHistoryPatch<T = any>(entitiesInitial: T[], command: CommandType): T[] {
    const [values, setValues] = useState<T[]>(() => entitiesInitial);
    const modify              = useWSS<T[]>(command);

    useEffect(() => {
        if (modify !== null) {
            setValues([...modify]);
        }
    }, [modify]);

    return values;
}