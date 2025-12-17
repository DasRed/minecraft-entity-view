'use client';

import HighlightDuration from '@/constant/HighlightDuration';
import {useEffect, useState} from 'react';

export default function useHighlight(value: unknown, duration: HighlightDuration = HighlightDuration.NORMAL) {
    const [highlight, setHighlight] = useState<boolean>(false);

    useEffect(() => {
        setHighlight(true);
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            setHighlight(false);
        }, duration);
        return () => clearTimeout(timeout);
    }, [value, duration]);

    return highlight;
}