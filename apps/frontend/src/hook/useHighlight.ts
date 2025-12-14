import HighlightDuration from '@/constant/HighlightDuration';
import {DependencyList, useEffect, useState} from 'react';


export default function useHighlight(deps?: DependencyList, duration: HighlightDuration = HighlightDuration.NORMAL) {
    const [highlight, setHighlight] = useState<boolean>(true);

    useEffect(() => {
        setHighlight(true);
        const timeout = setTimeout(() => setHighlight(false), duration);
        return () => clearTimeout(timeout);
    }, deps);

    return highlight;
}