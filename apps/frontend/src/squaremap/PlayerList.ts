import SquaremapPlayerDataInterface from '@/squaremap/interfaces/PlayerDataInterface';
import SquaremapPlayersDataInterface from '@/squaremap/interfaces/PlayersDataInterface';
import SquaremapSettingsUISidebar from '@/squaremap/interfaces/SettingsUISidebarInterface';
import SquaremapMap from '@/squaremap/Map';
import SquaremapPlayer from '@/squaremap/Player.js';
import {Marker} from 'leaflet';

export default class SquaremapPlayerList {
    firstTick: boolean;
    following: string | null = null;
    label: string;
    markers: Map<string, Marker>;
    players: Map<string, SquaremapPlayer>;
    squaremap: SquaremapMap;

    constructor(squaremap: SquaremapMap, json: SquaremapSettingsUISidebar) {
        this.squaremap = squaremap;
        this.players   = new Map();
        this.markers   = new Map();
        this.following = null;
        this.firstTick = true;
        this.label     = json.player_list_label;

        this.squaremap.leafletMap.createPane('nameplate').style.zIndex = '1000';
    }

    addToList(player: SquaremapPlayer) {
        const head = document.createElement('img');
        head.classList.add('head');
        head.src = player.getHeadUrl();

        const span     = document.createElement('span');
        span.innerHTML = player.displayName;

        const link = this.squaremap.createElement('a', player.uuid, this) as HTMLAnchorElement;
        link.addEventListener('click', function (e) {
            // @ts-ignore
            if (this.parent.showPlayer(this.id)) {
                // @ts-ignore
                this.parent.followPlayerMarker(this.id);
                e.stopPropagation();
            }
        });
        link.appendChild(head);
        link.appendChild(span);
        const fieldset = this.squaremap.sidebar.players.element;
        fieldset.appendChild(link);
        Array.from(fieldset.getElementsByTagName('a'))
             .sort((a, b) => {
                 const elementA = a.querySelector('span');
                 const elementB = b.querySelector('span');

                 return (elementA?.textContent ?? elementA?.innerText ?? '').localeCompare(elementB?.textContent ?? elementB?.innerText ?? '');
             })
             .forEach((link) => fieldset.appendChild(link));
    }

    clearPlayerMarkers() {
        this.players.values().forEach((player) => player.removeMarker());
        this.markers.clear();
    }

    followPlayerMarker(uuid: string | null) {
        if (this.following !== null && this.following !== uuid) {
            document.getElementById(this.following)!.classList.remove('following');
        }
        this.following = uuid;
        if (this.following != null) {
            document.getElementById(this.following)!.classList.add('following');
        }
    }

    removeFromList(player: SquaremapPlayer) {
        const link = document.getElementById(player.uuid);
        if (link != null) {
            link.remove();
        }
        this.players.delete(player.uuid);
        player.removeMarker();
    }

    showPlayer(uuid: string) {
        const player = this.players.get(uuid);
        if (player === undefined) {
            return false;
        }

        if (!this.squaremap.worldList.worlds.has(player.world)) {
            return false;
        }

        this.squaremap.worldList.showWorld(player.world, () => this.squaremap.leafletMap.panTo(this.squaremap.toLatLng(player.x, player.z)));

        return true;
    }

    tick() {
        if (this.squaremap.tick_count % this.squaremap.worldList.curWorld!.player_tracker!.update_interval !== 0) {
            return;
        }

        this.squaremap.getJSON('tiles/players.json', (json: SquaremapPlayersDataInterface) => {
                this.updatePlayerList(json.players);
                const title = `${this.label}`
                    .replace(/{cur}/g, String(json.players.length))
                    .replace(/{max}/g, json.max == null ? '???' : String(json.max));
                if (this.squaremap.sidebar.players.legend.innerHTML !== title) {
                    this.squaremap.sidebar.players.legend.innerHTML = title;
                }
            },
            true,
        );
    }

    updatePlayerList(players: SquaremapPlayerDataInterface[]) {
        let playersToRemove = Array.from(this.players.keys());
        let needsSort       = false;

        // update players from json
        for (let i = 0; i < players.length; i++) {
            let player = this.players.get(players[i].uuid);
            if (player == null) {
                // new player
                player = new SquaremapPlayer(this.squaremap, players[i]);
                this.players.set(player.uuid, player);
                this.addToList(player);
            }
            else {
                const oldDisplayName = player.displayName;
                player.update(players[i]);
                if (oldDisplayName !== player.displayName) {
                    needsSort                                                                       = true;
                    document.getElementById(player.uuid)!.getElementsByTagName('span')[0].innerHTML = player.displayName;
                }
            }
            playersToRemove = playersToRemove.filter((uuid) => uuid !== players[i].uuid);
        }

        // remove players not in json
        for (let i = 0; i < playersToRemove.length; i++) {
            const player = this.players.get(playersToRemove[i])!;
            this.removeFromList(player);
        }

        if (needsSort) {
            const fieldset = this.squaremap.sidebar.players.element;
            Array.from(fieldset.getElementsByTagName('a'))
                 .sort((a, b) => {
                     const elementA = a.querySelector('span');
                     const elementB = b.querySelector('span');

                     return (elementA?.textContent ?? elementA?.innerText ?? '').localeCompare(elementB?.textContent ?? elementB?.innerText ?? '');
                 })
                 .forEach((link) => fieldset.appendChild(link));
        }

        // first tick only
        if (this.firstTick) {
            this.firstTick = false;

            // follow uuid from url
            const follow = this.squaremap.getUrlParam('uuid', null);
            if (follow != null && this.players.get(follow) != null) {
                this.followPlayerMarker(follow);
            }
        }

        // follow highlighted player
        if (this.following != null) {
            const player = this.players.get(this.following);
            if (player != null && this.squaremap.worldList.curWorld != null) {
                if (player.world !== this.squaremap.worldList.curWorld.name) {
                    this.squaremap.worldList.showWorld(player.world, () => {
                        this.squaremap.leafletMap.panTo(this.squaremap.toLatLng(player.x, player.z));
                    });
                }
                else {
                    this.squaremap.leafletMap.panTo(this.squaremap.toLatLng(player.x, player.z));
                }
            }
        }
    }
}
