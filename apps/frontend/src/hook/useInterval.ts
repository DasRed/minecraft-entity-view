import {DependencyList, useEffect} from 'react';

export default function useInterval(interval: number, callback: () => void, deps?: DependencyList | any) {
    if (deps != null && Array.isArray(deps) === false) {
        deps = [deps];
    }

    useEffect(() => {
        callback();

        const handle = setInterval(callback, interval);

        return () => {
            clearInterval(handle);
        };
    }, deps);
}