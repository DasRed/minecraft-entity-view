import WSContext from '@/context/WSContext';
import wssStore from '@/lib/wssStore';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import {useCallback, useContext, useEffect, useSyncExternalStore} from 'react';

export default function useWSS<T = any>(command: CommandType): T | null;
export default function useWSS<T>(command: CommandType, initial: T): T;
export default function useWSS<T = any>(command: CommandType, initial: null): T | null;
export default function useWSS<T = any>(command: CommandType, initial: T | null): T | null;
export default function useWSS<T = any>(command: CommandType, initial?: T | null | undefined): T | null {
    const ctx = useContext(WSContext);
    if (!ctx) {
        throw new Error('useWSS must be used inside WSProvider');
    }

    useEffect(() => {
        ctx.ensureClient();
        return () => ctx.releaseClient();
    }, [ctx]);

    const subscribe   = useCallback((callback: () => void) => wssStore.subscribe(command, callback), [command]);
    const getSnapshot = useCallback(() => (wssStore.get(command) ?? initial ?? null) as T | null, [command]);

    // @ts-ignore
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}