import SquaremapPlayerDataInterface from '@/squaremap/interfaces/PlayerDataInterface';
import SquaremapMarkerPlayer from '@/squaremap/marker/Player';
import SquaremapMap from '@/squaremap/Map';
import {Tooltip} from 'leaflet';

export default class SquaremapPlayer {
    armor: number;
    displayName: string;
    health: number;
    marker: SquaremapMarkerPlayer;
    name: string;
    squaremap: SquaremapMap;
    tooltip: Tooltip;
    uuid: string;
    world: string;
    x: number;
    z: number;

    constructor(squaremap: SquaremapMap, json: SquaremapPlayerDataInterface) {
        this.squaremap   = squaremap;
        this.name        = json.name;
        this.uuid        = json.uuid;
        this.world       = json.world;
        this.displayName = json.display_name !== undefined ? json.display_name : json.name;
        this.x           = 0;
        this.z           = 0;
        this.armor       = 0;
        this.health      = 20;
        this.tooltip     = new Tooltip({
            permanent: true,
            direction: 'right',
            offset:    [10, 0],
            pane:      'nameplate',
            content:   this.makeNameplateContent(json),
        });
        this.marker      = new SquaremapMarkerPlayer(180 + json.yaw, squaremap.toLatLng(json.x, json.z));
        if (squaremap.worldList.curWorld!.player_tracker!.nameplates.enabled) {
            this.updateNameplate(json);
            this.marker.bindTooltip(this.tooltip);
        }
    }

    addMarker() {
        if (!this.squaremap.playerList.markers.has(this.uuid)) {
            this.marker.addTo(this.squaremap.layerControl.playersLayer);
            this.squaremap.playerList.markers.set(this.uuid, this.marker);
        }
    }

    getHeadUrl() {
        return this.squaremap.worldList.curWorld!.player_tracker!.nameplates.heads_url
                                                                 .replace(/{uuid}/g, this.uuid)
                                                                 .replace(/{name}/g, this.name);
    }

    makeNameplateContent(player: SquaremapPlayerDataInterface) {
        const container = document.createElement('div');
        container.classList.add('nameplate-container');

        if (this.squaremap.worldList.curWorld!.player_tracker!.nameplates.show_heads) {
            const head = document.createElement('img');
            head.src   = this.getHeadUrl();
            head.classList.add('head');
            container.appendChild(head);
        }

        const col2 = document.createElement('div');
        col2.classList.add('nameplate-col2');

        const displayName = document.createElement('span');
        displayName.classList.add('display-name');
        displayName.innerHTML = this.displayName;
        col2.appendChild(displayName);

        if (this.squaremap.worldList.curWorld!.player_tracker!.nameplates.show_health && player.health != null) {
            const health = document.createElement('img');
            health.src   = `images/health/${Math.min(Math.max(player.health, 0), 20)}.png`;
            health.classList.add('health');
            col2.appendChild(health);
        }

        if (this.squaremap.worldList.curWorld!.player_tracker!.nameplates.show_armor && player.armor != null) {
            const armor = document.createElement('img');
            armor.src   = `images/armor/${Math.min(Math.max(player.armor, 0), 20)}.png`;
            armor.classList.add('armor');
            col2.appendChild(armor);
        }

        container.appendChild(col2);
        return container;
    }

    removeMarker() {
        this.marker.remove();
        this.squaremap.playerList.markers.delete(this.uuid);
        this.squaremap.leafletMap.removeLayer(this.marker);
        // this.squaremap.layerControl.playersLayer.removeLayer(this.marker);
    }

    setNameplateContent(player: SquaremapPlayerDataInterface) {
        this.tooltip.setContent(this.makeNameplateContent(player));
    }

    update(player: SquaremapPlayerDataInterface) {
        this.x           = player.x;
        this.z           = player.z;
        this.world       = player.world;
        this.armor       = player.armor;
        this.health      = player.health;
        this.displayName = player.display_name !== undefined ? player.display_name : player.name;
        const link       = document.getElementById(player.uuid)!;
        const img        = link.querySelector('img')!;
        const span       = link.querySelector('span')!;
        if (this.squaremap.worldList.curWorld!.name == player.world) {
            if (this.squaremap.worldList.curWorld!.player_tracker!.enabled) {
                this.addMarker();
            }
            const latlng = this.squaremap.toLatLng(player.x, player.z);
            if (!this.marker.getLatLng().equals(latlng)) {
                this.marker.setLatLng(latlng);
            }
            this.marker.setRotationAngle(180 + player.yaw);
            img.classList.remove('other-world');
            span.classList.remove('other-world');
        }
        else {
            this.removeMarker();
            img.classList.add('other-world');
            span.classList.add('other-world');
        }
        this.updateNameplate(player);
    }

    updateNameplate(player: SquaremapPlayerDataInterface) {
        const resetOnMismatch = (player: SquaremapPlayerDataInterface, a: boolean, b: boolean) => {
            if (a !== b) {
                this.setNameplateContent(player);
                return true;
            }
            return false;
        };

        // @ts-ignore
        const head = this.tooltip.getContent()!.querySelectorAll('.head')[0];
        if (resetOnMismatch(player, head !== undefined, this.squaremap.worldList.curWorld!.player_tracker!.nameplates.show_heads)) {
            return;
        }
        // @ts-ignore
        const armor = this.tooltip.getContent()!.querySelectorAll('.armor')[0];
        if (
            resetOnMismatch(
                player,
                armor !== undefined,
                this.squaremap.worldList.curWorld!.player_tracker!.nameplates.show_armor && player.armor != null,
            )
        ) {
            return;
        }
        // @ts-ignore
        const health = this.tooltip.getContent()!.querySelectorAll('.health')[0];
        if (
            resetOnMismatch(
                player,
                health !== undefined,
                this.squaremap.worldList.curWorld!.player_tracker!.nameplates.show_health && player.health != null,
            )
        ) {
            return;
        }
        // @ts-ignore
        const displayName = this.tooltip.getContent()!.querySelectorAll('.display-name')[0];

        // Only update if it's different
        if (displayName.innerHTML !== this.displayName) {
            displayName.innerHTML = this.displayName;
        }
        if (head) {
            const headSrc        = this.getHeadUrl();
            const currentHeadSrc = head.src.split('/').pop();
            if (currentHeadSrc !== headSrc.split('/').pop()) {
                head.src = headSrc;
            }
        }
        if (health && player.health != null) {
            const healthSrc        = `images/health/${Math.min(Math.max(player.health, 0), 20)}.png`;
            const currentHealthSrc = health.src.split('/').pop();
            if (currentHealthSrc !== healthSrc.split('/').pop()) {
                health.src = healthSrc;
            }
        }
        if (armor && player.armor != null) {
            const armorSrc        = `images/armor/${Math.min(Math.max(player.armor, 0), 20)}.png`;
            const currentArmorSrc = armor.src.split('/').pop();
            if (currentArmorSrc !== armorSrc.split('/').pop()) {
                armor.src = armorSrc;
            }
        }
    }
}
