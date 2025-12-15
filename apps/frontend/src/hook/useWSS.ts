import wsc from '@/lib/wsc';
import {useEffect, useState} from 'react';

export default function useWSS<T>(command: string, init: T, once?: boolean): T;
export default function useWSS<T = any>(command: string, init?: null, once?: boolean): T | null;
export default function useWSS<T = any>(command: string, init?: T | null | undefined, once: boolean = false): T | null {
    const [result, setResult] = useState<T | null>(init ?? null);

    useEffect(() => {
        if (once) {
            wsc.once(command, setResult);
        }
        else {
            wsc.on(command, setResult);
        }
        return () => void wsc.off(command);
    }, [command]);

    return result;
}