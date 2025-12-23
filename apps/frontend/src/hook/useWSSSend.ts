import WSContext from '@/context/WSContext';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import {useContext} from 'react';

export default function useWSSSend(): (type: CommandType, data: unknown) => void {
    const ctx = useContext(WSContext);
    if (!ctx) {
        throw new Error('useWSS must be used inside WSProvider');
    }

    return ctx.send;
}