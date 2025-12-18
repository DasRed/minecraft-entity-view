import WSContext from '@/context/WSContext';
import wssStore from '@/lib/wssStore';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import {useContext, useEffect, useSyncExternalStore} from 'react';

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

    function subscribe(callback: () => void) {
        return wssStore.subscribe(command, callback);
    }

    function getSnapshot() {
        return (wssStore.get(command) ?? initial ?? null) as T | null;
    }

    // @ts-ignore
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}