import useWSS from '@/hook/useWSS';
import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import {set} from 'lodash-es';
import {useRef} from 'react';

export default function useWSSPatch<T extends Object>(initial: T, command: CommandType): T {
    const ref   = useRef<T>({...initial});
    const patch = useWSS<Record<string, unknown>>(command, {});

    Object.entries(patch).forEach(([path, value]) => set(ref.current, path, value));

    return ref.current;
}