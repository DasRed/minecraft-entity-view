import {DependencyList, useEffect, useState} from 'react';

export default function useHighlight(deps?: DependencyList) {
    const [highlight, setHighlight] = useState<boolean>(true);

    useEffect(() => {
        setHighlight(true);
        const timeout = setTimeout(() => setHighlight(false), 800);
        return () => clearTimeout(timeout);
    }, deps);

    return highlight;
}