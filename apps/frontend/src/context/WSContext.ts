import WebSocketClient from '@/service/WebSocketClient';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import {createContext} from 'react';

type WSContextType = {
    ensureClient: () => WebSocketClient;
    releaseClient: () => void;
    send: (type: CommandType, data: unknown) => void;
};

const WSContext = createContext<WSContextType | null>(null);

export default WSContext;