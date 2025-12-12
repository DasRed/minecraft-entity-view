import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export default function cn(...cls: ClassValue[]): string {
    return twMerge(clsx(cls));
}
