import MapControlToggleIcon from '@/component/map/control/ToggleIcon';
import MapLayerSpawn from '@/component/map/layer/Spawn';
import setting from '@/lib/setting';
import {ReactElement, useEffect, useState} from 'react';

export default function MapControlSpawnIcon(): ReactElement {
    const [showSpawn, setShowSpawn] = useState<boolean>(setting.get('spawn.visible', false));
    useEffect(() => void setting.set('spawn.visible', showSpawn), [showSpawn]);

    return (
        <>
            <MapControlToggleIcon title="Spawn" icon="/map/spawn/32x32.png" onToggle={setShowSpawn} active={showSpawn}/>
            <MapLayerSpawn visible={showSpawn}/>
        </>
    );
}