'use client';

import config from '@/config';
import wssStore from '@/lib/wssStore';
import WebSocketClient from '@/service/WebSocketClient';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import {useCallback, useSyncExternalStore} from 'react';

let wsc: WebSocketClient | null = null;

export default function useWSS<T = any>(command: CommandType): T | null;
export default function useWSS<T>(command: CommandType, initial: T): T;
export default function useWSS<T = any>(command: CommandType, initial: null): T | null;
export default function useWSS<T = any>(command: CommandType, initial: T | null): T | null;
export default function useWSS<T = any>(command: CommandType, initial?: T | null | undefined): T | null {
    if (wsc === null) {
        wsc = new WebSocketClient(config.websocket);
        wsc.on('*', (command, data) => wssStore.set(command, data));
    }

    const subscribe   = useCallback((callback: () => void) => wssStore.subscribe(command, callback), [command]);
    const getSnapshot = useCallback(() => (wssStore.get(command) ?? initial ?? null) as T | null, [command]);

    // @ts-ignore
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}