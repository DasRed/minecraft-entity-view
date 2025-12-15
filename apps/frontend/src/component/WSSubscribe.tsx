'use client';

import useWSS from '@/hook/useWSS';
import {memo, ReactElement} from 'react';

type ChildrenWithInitial<T> = (value: T, initial: T) => ReactElement | string | null;
type ChildrenWithoutInitial<T> = (value: T) => ReactElement | string | null;

interface WSSubscribeWithInitialOptionInterface<T> {
    command: string;
    initial: T;
    children: ChildrenWithInitial<T>;
    once?: boolean;
}

interface WSSubscribeWithoutInitialOptionInterface<T> {
    command: string;
    initial?: null;
    children: ChildrenWithoutInitial<T>;
    once?: boolean;
}

type WSSubscribeOptionInterface<T> = WSSubscribeWithInitialOptionInterface<T> | WSSubscribeWithoutInitialOptionInterface<T>;

function WSSubscriber<T = any>({command, initial, children, once}: WSSubscribeWithoutInitialOptionInterface<T>): ReactElement | string | null;
function WSSubscriber<T = any>({command, initial, children, once}: WSSubscribeWithInitialOptionInterface<T>): ReactElement | string | null;
function WSSubscriber<T = any>({command, initial, children, once = false}: WSSubscribeOptionInterface<T>): ReactElement | string | null {
    if (initial === null || initial === undefined) {
        const value = useWSS<T>(command, null, once);
        return value !== null ? (children as ChildrenWithoutInitial<T>)(value) : null;
    }

    const value = useWSS<T>(command, initial, once);
    return (children as ChildrenWithInitial<T>)(value, initial);
}

const WSSubscribe = memo(WSSubscriber) as typeof WSSubscriber;

export default WSSubscribe;
