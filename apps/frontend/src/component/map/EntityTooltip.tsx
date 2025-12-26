import Coordinates from '@/component/Coordinates';
import {Marker, Tooltip} from 'leaflet';
import {LucideClock, LucideMapPin, LucideSkull} from 'lucide-react';
import {Duration} from 'luxon';
import {ReactElement, useEffect, useRef} from 'react';

interface MapEntityTooltipOptionsInterface {
    marker: Marker;
    name: string;
    image: string;
    x: number;
    y: number;
    z: number;
    durationAlive?: number;
    onClickKill?: () => void;
    permanent?: boolean;
}

export default function MapEntityTooltip({marker, name, image, x, y, z, durationAlive, onClickKill, permanent = false}: MapEntityTooltipOptionsInterface): ReactElement {
    const refTooltipElement = useRef<HTMLDivElement>(null);
    const refTooltip        = useRef<Tooltip>(null);

    useEffect(() => {
        if (refTooltip.current?.options.permanent === permanent) {
            return;
        }

        marker.unbindTooltip();
        refTooltip.current?.remove();
        refTooltip.current = new Tooltip({
            permanent: permanent,
            direction: 'right',
            offset:    [5, 0],
            content:   refTooltipElement.current!,
            className: 'bg-black/90! border-gray-500/85! before:content-none! rounded!',
        });

        marker.bindTooltip(refTooltip.current);

        return () => void marker?.unbindTooltip();
    }, [permanent]);

    return (
        <div className="hidden">
            <div
                ref={refTooltipElement}
                className="text-white flex-row w-max flex gap-1 items-start flex-nowrap font-sans text-sm leading-4 pointer-events-auto"
            >
                <img src={image} alt="" className="w-8 h-8"/>
                <div className="flex flex-col">
                    <div className="flex flex-row gap-5">
                        <div className="font-bold">{name}</div>
                        {onClickKill &&
                            <>
                                <div className="flex-1"/>
                                <div>
                                    <LucideSkull className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={onClickKill}/>
                                </div>
                            </>
                        }
                    </div>
                    <div className="text-gray-300 flex flex-row gap-1 items-center">
                        <LucideMapPin className="w-3 h-3"/> <Coordinates x={x} y={y} z={z}/>
                    </div>
                    {durationAlive &&
                        <div className="text-gray-300 flex flex-row gap-1 items-center">
                            <LucideClock className="w-3 h-3"/> <span>{Duration.fromMillis(durationAlive).toFormat('hh:mm:ss')}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}