import SquaremapSettingsUIInterface from '@/squaremap/interfaces/SettingsUIInterface';
import SquaremapSettingsWorldInterface from '@/squaremap/interfaces/SettingsWorldInterface';

interface SquaremapSettingsInterface {
    ui: SquaremapSettingsUIInterface;
    worlds: SquaremapSettingsWorldInterface[];
}

export default SquaremapSettingsInterface;