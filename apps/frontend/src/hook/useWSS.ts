import wsc from '@/lib/wsc';
import {useEffect, useState} from 'react';

export default function useWSS<T>(command: string, init: T): T;
export default function useWSS<T = any>(command: string, init?: null): T | null;
export default function useWSS<T = any>(command: string, init?: T | null | undefined): T | null {
    const [result, setResult] = useState<T | null>(init ?? null);

    useEffect(() => {
        wsc.on(command, setResult);
        return () => void wsc.off(command);
    }, [command, init]);

    return result;
}