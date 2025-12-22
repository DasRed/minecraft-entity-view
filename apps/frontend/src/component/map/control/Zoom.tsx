import useMap from '@/component/map/provider/map/use';
import cn from '@/lib/cn';
import {LucideMinus, LucidePlus} from 'lucide-react';
import {ReactElement, useEffect, useState} from 'react';

export default function MapControlZoom(): ReactElement {
    const {leafletMap} = useMap();
    const [, setZoom]  = useState<number>(leafletMap.getZoom());

    useEffect(() => {
        leafletMap.on('zoom', (event) => setZoom(event.target._zoom));
        return () => void leafletMap.off('zoom');
    }, [leafletMap]);

    return (
        <>
            <div onClick={() => leafletMap.zoomIn()} className={cn('pl-3 pt-1 w-12 h-8 hover:bg-orange-400/50 transition-colors cursor-pointer', {
                'opacity-25 hover:bg-transparent': leafletMap.getZoom() >= leafletMap.getMaxZoom(),
            })}>
                <LucidePlus className="w-6 h-6"/>
            </div>
            <div onClick={() => leafletMap.zoomOut()} className={cn('pl-3 py-1 w-12 h-8 hover:bg-orange-400/50 transition-colors cursor-pointer', {
                'opacity-25 hover:bg-transparent': leafletMap.getZoom() <= leafletMap.getMinZoom(),
            })}>
                <LucideMinus className="w-6 h-6"/>
            </div>
        </>
    );
}