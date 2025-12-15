'use client';

import useWSS from '@/hook/useWSS';
import {memo, ReactElement} from 'react';

type ChildrenWithInitial<T> = (value: T, initial: T) => ReactElement | string | null;
type ChildrenWithoutInitial<T> = (value: T) => ReactElement | string | null;

interface WSSubscribeWithInitialOptionInterface<T> {
    command: string;
    initial: T;
    children: ChildrenWithInitial<T>;
}

interface WSSubscribeWithoutInitialOptionInterface<T> {
    command: string;
    initial?: null;
    children: ChildrenWithoutInitial<T>;
}

type WSSubscribeOptionInterface<T> = WSSubscribeWithInitialOptionInterface<T> | WSSubscribeWithoutInitialOptionInterface<T>;

function WSSubscriber<T = any>({command, initial, children}: WSSubscribeWithoutInitialOptionInterface<T>): ReactElement | string | null;
function WSSubscriber<T = any>({command, initial, children}: WSSubscribeWithInitialOptionInterface<T>): ReactElement | string | null;
function WSSubscriber<T = any>({command, initial, children}: WSSubscribeOptionInterface<T>): ReactElement | string | null {
    if (initial === null || initial === undefined) {
        const value = useWSS<T>(command, null);
        return value !== null ? (children as ChildrenWithoutInitial<T>)(value) : null;
    }

    const value = useWSS<T>(command, initial);
    return (children as ChildrenWithInitial<T>)(value, initial);
}

const WSSubscribe = memo(WSSubscriber) as typeof WSSubscriber;

export default WSSubscribe;
