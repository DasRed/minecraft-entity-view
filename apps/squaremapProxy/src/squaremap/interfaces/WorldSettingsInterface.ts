import SquaremapWorldSettingsPlayerTracker from '@/squaremap/interfaces/WorldSettingsPlayerTracker';
import SquaremapWorldSettingsSpawnInterface from '@/squaremap/interfaces/WorldSettingsSpawnInterface';
import SquaremapWorldSettingsZoom from '@/squaremap/interfaces/WorldSettingsZoomInterface';

interface SquaremapWorldSettings {
    marker_update_interval: number;
    player_tracker: SquaremapWorldSettingsPlayerTracker;
    spawn: SquaremapWorldSettingsSpawnInterface;
    tiles_update_interval: number;
    zoom: SquaremapWorldSettingsZoom;
}

export default SquaremapWorldSettings;