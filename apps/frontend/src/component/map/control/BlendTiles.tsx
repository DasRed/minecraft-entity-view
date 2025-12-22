import MapControlToggleIcon from '@/component/map/control/ToggleIcon';
import useMap from '@/component/map/provider/map/use';
import setting from '@/lib/setting';
import {ReactElement, useEffect, useState} from 'react';

export default function MapControlBlendTiles(): ReactElement {
    const map = useMap();

    const [isActive, setIsActive] = useState<boolean>(setting.get('tiles.blend', false));
    useEffect(() => {
        setting.set('tiles.blend', isActive);

        if (isActive) {
            map.leafletMap.getPane('tilePane')?.classList.add('opacity-25');
        }
        else {
            map.leafletMap.getPane('tilePane')?.classList.remove('opacity-25');
        }
    }, [isActive]);

    return (
        <>
            <MapControlToggleIcon title="Tiles darken" icon="/map/blend/32x32.png" onToggle={setIsActive} active={isActive}/>
        </>
    );
}