import SquaremapWorldSettingsPlayerTrackerNameplates from '@/squaremap/interfaces/WorldSettingsPlayerTrackerNameplatesInterface';

interface SquaremapWorldSettingsPlayerTracker {
    default_hidden: boolean;
    enabled: boolean;
    label: string;
    nameplates: SquaremapWorldSettingsPlayerTrackerNameplates;
    priority: number;
    show_controls: boolean;
    update_interval: number;
    z_index: number;
}

export default SquaremapWorldSettingsPlayerTracker;