import MapControlContainer from '@/component/map/control/Container';
import MapControlToggleIcon from '@/component/map/control/ToggleIcon';
import MapLayerSpawn from '@/component/map/layer/Spawn';
import {ReactElement, useState} from 'react';

export default function MapControlSpawnIcon(): ReactElement {
    const [showSpawn, setShowSpawn] = useState<boolean>(false);

    return (
        <MapControlContainer>
            <MapControlToggleIcon title="Spawn" icon="/map/spawn/32x32.png" onToggle={setShowSpawn} active={showSpawn}/>
            <MapLayerSpawn visible={showSpawn}/>
        </MapControlContainer>
    );
}