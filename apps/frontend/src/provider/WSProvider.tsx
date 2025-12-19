import config from '@/config';
import WSContext from '@/context/WSContext';
import wssStore from '@/lib/wssStore';
import WebSocketClient from '@/service/WebSocketClient';
import {PropsWithChildren, useEffect, useRef} from 'react';

export default function WSProvider({children}: PropsWithChildren) {
    const clientRef  = useRef<WebSocketClient | null>(null);
    const usageRef   = useRef(0);
    const closeTimer = useRef<NodeJS.Timeout | null>(null);

    function ensureClient() {
        if (closeTimer.current !== null) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }

        if (!clientRef.current) {
            const client = new WebSocketClient(config.websocket);
            client.register((command, data) => wssStore.set(command, data));
            clientRef.current = client;
        }

        usageRef.current++;
        return clientRef.current;
    }

    function releaseClient() {
        usageRef.current--;

        if (usageRef.current <= 0) {
            closeTimer.current = setTimeout(() => {
                clientRef.current?.close();
                clientRef.current  = null;
                usageRef.current   = 0;
                closeTimer.current = null;
            }, 100);
        }
    }

    useEffect(() => {
        return () => {
            if (closeTimer.current !== null) {
                clearTimeout(closeTimer.current);
            }
            clientRef.current?.close();
        };
    }, []);

    return (
        <WSContext.Provider value={{ensureClient, releaseClient}}>
            {children}
        </WSContext.Provider>
    );
}