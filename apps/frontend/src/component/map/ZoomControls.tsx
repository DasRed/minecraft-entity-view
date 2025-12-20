import MapControlContainer from '@/component/map/ControlContainer';
import useMap from '@/component/map/useMap';
import cn from '@/lib/cn';
import {LucideMinus, LucidePlus} from 'lucide-react';
import {ReactElement, useEffect, useState} from 'react';

export default function MapZoomControls(): ReactElement {
    const {leafletMap} = useMap();
    const [, setZoom]  = useState<number>(1);

    useEffect(() => {
        leafletMap.on('zoom', (event) => setZoom(event.target._zoom));
        return () => void leafletMap.off('zoom');
    }, [leafletMap]);

    return (
        <MapControlContainer expandable={false}>
            <div onClick={() => leafletMap.zoomIn()} className={cn('pl-2 pt-2 w-8 h-8 hover:bg-orange-400/50 transition-colors cursor-pointer', {
                'opacity-25 hover:bg-transparent': leafletMap.getZoom() >= leafletMap.getMaxZoom(),
            })}>
                <LucidePlus className="w-4 h-4"/>
            </div>
            <div onClick={() => leafletMap.zoomOut()} className={cn('pl-2 py-1 w-8 h-8 hover:bg-orange-400/50 transition-colors cursor-pointer', {
                'opacity-25 hover:bg-transparent': leafletMap.getZoom() <= leafletMap.getMinZoom(),
            })}>
                <LucideMinus className="w-4 h-6"/>
            </div>
        </MapControlContainer>
    );
}