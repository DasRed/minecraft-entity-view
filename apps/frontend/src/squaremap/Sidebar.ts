import SquaremapSettingsUISidebar from '@/squaremap/interfaces/SettingsUISidebarInterface';
import SquaremapMap from '@/squaremap/Map';
import SquaremapFieldset from '@/squaremap/Fieldset.js';
import SquaremapPin from '@/squaremap/Pin.js';

export default class SquaremapSidebar {
    pin: SquaremapPin;
    players: SquaremapFieldset;
    showSidebar: boolean;
    sidebar: HTMLDivElement;
    worlds: SquaremapFieldset;

    constructor(squaremap: SquaremapMap, json: SquaremapSettingsUISidebar, show: boolean) {
        this.sidebar     = squaremap.createElement('div', 'sidebar', this) as HTMLDivElement;
        this.showSidebar = show;
        if (!show) {
            this.sidebar.style.display = 'none';
        }
        this.sidebar.addEventListener('click', (e) => {
            squaremap.playerList.followPlayerMarker(null);
            e.stopPropagation();
        });
        squaremap.element.appendChild(this.sidebar);

        this.pin = new SquaremapPin(squaremap, json.pinned === 'pinned');
        this.show(this.pin.pinned);
        if (json.pinned !== 'hide') {
            this.sidebar.appendChild(this.pin.element);
        }

        this.worlds = new SquaremapFieldset(squaremap, 'worlds', json.world_list_label);
        this.sidebar.appendChild(this.worlds.element);

        this.players = new SquaremapFieldset(squaremap, 'players', json.player_list_label.replace(/{cur}/g, '0').replace(/{max}/g, '0'));
        this.sidebar.appendChild(this.players.element);

        this.sidebar.onmouseleave = () => {
            if (!this.pin.pinned) {
                this.show(false);
            }
        };
        this.sidebar.onmouseenter = () => {
            if (!this.pin.pinned) {
                this.show(true);
            }
        };

        squaremap.element.addEventListener('click', (e) => {
            // @ts-ignore
            if (!this.sidebar.contains(e.target) && !this.pin.pinned && this.sidebar.className === 'show') {
                this.show(false);
            }
        });
    }

    remove() {
        this.sidebar.remove();
    }

    show(show: boolean) {
        this.sidebar.className = show ? 'show' : '';
    }
}
