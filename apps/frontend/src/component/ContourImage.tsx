import {ReactElement} from 'react';

export enum ContourType {
    DEFAULT = `
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 1 0
              `,
    WARNING = `
                0 0 0 0 1.00
                0 0 0 0 0.78
                0 0 0 0 0.25
                0 0 0 1 0
              `,
    ERROR   = `
                0 0 0 0 1
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 1 0
              `,
}

interface ContourImageOptionsInterface {
    src: string;
    type?: ContourType | string;
    width: number;
    height: number;
}

export default function ContourImage({src, type = ContourType.DEFAULT, width, height}: ContourImageOptionsInterface): ReactElement {
    return (
        <svg viewBox="0 0 300 300" style={{width: `${width}px`, height: `${height}px`}}>
            <defs>
                <filter id="outline">
                    <feMorphology operator="dilate" radius="5"/>
                    <feColorMatrix type="matrix" values={type}/>
                </filter>
            </defs>

            <image href={src} width="300" height="300" filter="url(#outline)"/>
            <image href={src} x="25" y="25" width="250" height="250"/>
        </svg>
    );
}