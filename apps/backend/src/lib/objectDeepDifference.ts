import {isEqual, isObject, transform} from 'lodash-es';

function changes<T = Record<string, any>>(object: T, base: T): Partial<T> {
    // @ts-ignore
    return transform(object, function (result: Record<string, any>, value: any, key: string) {
        // @ts-ignore
        if (!isEqual(value, base[key])) {
            // @ts-ignore
            result[key] = (isObject(value) && isObject(base[key])) ? changes(value, base[key]) : value;
        }
    });
}

export default function objectDeepDifference<T = Record<string, any>>(object: T, base: T): Partial<T> {
    return changes<T>(object, base);
}
