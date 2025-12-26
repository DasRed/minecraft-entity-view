import {ReactElement, useRef} from 'react';

export enum ContourType {
    DEFAULT = 'default',
    WARNING = 'warning',
    ERROR   = 'error',
}

const ContourTypeValue: Record<ContourType, string> = {
    [ContourType.DEFAULT]: `
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 1 0
              `,
    [ContourType.WARNING]: `
                0 0 0 0 1.00
                0 0 0 0 0.78
                0 0 0 0 0.25
                0 0 0 1 0
              `,
    [ContourType.ERROR]: `
                0 0 0 0 1
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 1 0
              `,
};

interface ContourImageOptionsInterface {
    src: string;
    type?: ContourType;
    width: number;
    height: number;
}

export default function ContourImage({src, type = ContourType.DEFAULT, width, height}: ContourImageOptionsInterface): ReactElement {
    const refId = useRef(Math.random());

    return (
        <svg viewBox="0 0 300 300" style={{width: `${width}px`, height: `${height}px`}}>
            <defs>
                <filter id={`outline-${refId.current}`}>
                    <feMorphology operator="dilate" radius="5"/>
                    <feColorMatrix type="matrix" values={ContourTypeValue[type]}/>
                </filter>
            </defs>

            <image href={src} width="300" height="300" filter={`url(#outline-${refId.current})`} style={{imageRendering: 'pixelated'}}/>
            <image href={src} x="25" y="25" width="250" height="250" style={{imageRendering: 'pixelated'}}/>
        </svg>
    );
}