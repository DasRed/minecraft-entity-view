import HighlightDuration from '@/constant/HighlightDuration';
import useHighlight from '@/hook/useHighlight';
import useWSS from '@/hook/useWSS';
import {useEffect, useState} from 'react';

export default function useWSSHistoryPatch<T = any>(entitiesInitial: T[], command: string): { history: T[], highlight: boolean } {
    const [helper, setHelper] = useState<number>(Math.random());
    const [values, setValues] = useState<T[]>(() => entitiesInitial);
    const modify              = useWSS<T[]>(command);
    const highlight           = useHighlight(helper, HighlightDuration.FAST);

    useEffect(() => {
        if (modify !== null) {
            setValues((prev) => [...prev, ...modify]);
            setHelper(Math.random());
        }
    }, [modify]);

    return {history: values, highlight};
}