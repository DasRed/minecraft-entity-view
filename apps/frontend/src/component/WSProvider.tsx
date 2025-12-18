import config from '@/config';
import WSContext from '@/context/WSContext';
import wssStore from '@/lib/wssStore';
import WebSocketClient from '@/service/WebSocketClient';
import {PropsWithChildren, useCallback, useRef} from 'react';

export default function WSProvider({children}: PropsWithChildren) {
    const clientRef = useRef<WebSocketClient | null>(null);
    const usageRef  = useRef(0);

    const ensureClient = useCallback(() => {
        if (!clientRef.current) {
            const client = new WebSocketClient(config.websocket);
            client.register((command, data) => wssStore.set(command, data));
            clientRef.current = client;
        }

        usageRef.current++;
        return clientRef.current;
    }, []);

    const releaseClient = useCallback(() => {
        usageRef.current--;

        if (usageRef.current <= 0) {
            clientRef.current?.close();
            clientRef.current = null;
            usageRef.current  = 0;
        }
    }, []);

    return (
        <WSContext.Provider value={{ensureClient, releaseClient}}>
            {children}
        </WSContext.Provider>
    );
}