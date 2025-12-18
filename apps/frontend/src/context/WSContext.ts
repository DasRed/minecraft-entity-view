import WebSocketClient from '@/service/WebSocketClient';
import {createContext} from 'react';

type WSContextType = {
    ensureClient: () => WebSocketClient;
    releaseClient: () => void;
};

const WSContext = createContext<WSContextType | null>(null);

export default WSContext;