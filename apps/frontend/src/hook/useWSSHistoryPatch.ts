import useWSS from '@/hook/useWSS';
import {useEffect, useState} from 'react';

export default function useWSSHistoryPatch<T = any>(entitiesInitial: T[], command: string): T[] {
    const [values, setValues] = useState<T[]>(() => entitiesInitial);
    const modify              = useWSS<T[]>(command);

    useEffect(() => {
        if (modify !== null) {
            setValues((prev) => [...prev, ...modify]);
        }
    }, [modify]);

    return values;
}