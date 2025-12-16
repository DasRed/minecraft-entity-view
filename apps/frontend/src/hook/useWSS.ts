import config from '@/config';
import WebSocketClient from '@/service/WebSocketClient';
import {useEffect, useState} from 'react';

let wsc: WebSocketClient | null = null;

export default function useWSS<T>(command: string, init: T): T;
export default function useWSS<T = any>(command: string, init?: null): T | null;
export default function useWSS<T = any>(command: string, init?: T | null | undefined): T | null {
    const [result, setResult] = useState<T | null>(init ?? null);

    useEffect(() => {
        if (wsc === null) {
            wsc = new WebSocketClient(config.websocket);
        }

        wsc.on(command, setResult);
        return () => void wsc?.off(command);
    }, [command, init]);

    return result;
}