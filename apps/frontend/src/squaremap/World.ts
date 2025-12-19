import SquaremapMarkerInterface from '@/squaremap/interfaces/MarkerInterface';
import SquaremapSettingsWorldInterface from '@/squaremap/interfaces/SettingsWorldInterface';
import SquaremapWorldSettings from '@/squaremap/interfaces/WorldSettingsInterface';
import SquaremapWorldSettingsPlayerTracker from '@/squaremap/interfaces/WorldSettingsPlayerTracker';
import SquaremapWorldSettingsSpawnInterface from '@/squaremap/interfaces/WorldSettingsSpawnInterface';
import SquaremapWorldSettingsZoom from '@/squaremap/interfaces/WorldSettingsZoomInterface';
import SquaremapMarkerLayerGroup from '@/squaremap/layerGroup/MarkerGroup';
import SquaremapLayerFactory from '@/squaremap/layer/Factory';
import SquaremapMap from '@/squaremap/Map';

export default class SquaremapWorld {
    display_name: string;
    icon: string;
    markerLayers: Map<string, SquaremapMarkerLayerGroup>;
    marker_update_interval: number;
    name: string;
    order: number;
    player_tracker: SquaremapWorldSettingsPlayerTracker | null = null;
    spawn: SquaremapWorldSettingsSpawnInterface | null         = null;
    squaremap: SquaremapMap;
    staticNeedsMarkerTick: boolean;
    tiles_update_interval: number;
    type: string;
    zoom: SquaremapWorldSettingsZoom | null                    = null;

    constructor(S: SquaremapMap, json: SquaremapSettingsWorldInterface) {
        this.squaremap              = S;
        this.name                   = json.name;
        this.order                  = json.order;
        this.icon                   = json.icon;
        this.type                   = json.type;
        this.display_name           = json.display_name;
        this.markerLayers           = new Map();
        this.marker_update_interval = 5;
        this.tiles_update_interval  = 15;
        this.staticNeedsMarkerTick  = false;
    }

    getBackground() {
        switch (this.type) {
            case 'nether':
                return 'url(\'images/nether_sky.png\')';
            case 'the_end':
                return 'url(\'images/end_sky.png\')';
            case 'normal':
            default:
                return 'url(\'images/overworld_sky.png\')';
        }
    }

    load(callback: (world: SquaremapWorld) => void) {
        this.squaremap.getJSON(
            `tiles/${this.name}/settings.json`,
            (json: SquaremapWorldSettings) => {
                // @ts-ignore
                if (this.squaremap.map._mapPane === undefined) {
                    return;
                }
                this.player_tracker         = json.player_tracker;
                this.zoom                   = json.zoom;
                this.spawn                  = json.spawn;
                this.marker_update_interval = json.marker_update_interval;
                this.tiles_update_interval  = json.tiles_update_interval;
                this.staticNeedsMarkerTick  = true;

                // set the scale for our projection calculations
                this.squaremap.setScale(this.zoom.max);

                // set center and zoom
                this.squaremap.centerOn(this.spawn.x, this.spawn.z, this.zoom.def)
                    .setMinZoom(0) // extra zoom out doesn't work :(
                    .setMaxZoom(this.zoom.max + this.zoom.extra);

                // setup background
                this.squaremap.element.style.background = this.getBackground();

                // setup tile layers
                this.squaremap.layerControl.setupTileLayers(this);

                // force clear player markers
                this.squaremap.playerList.clearPlayerMarkers();

                // tick now, reset counter
                this.squaremap.tick_count = 0;
                this.squaremap.tick();

                // force clear player markers
                this.squaremap.playerList.clearPlayerMarkers();

                if (callback != null) {
                    callback(this);
                }
            },
        );
    }

    markers(json: SquaremapMarkerInterface[]) {
        // check if json is iterable
        if (json == null) {
            return;
        }
        // iterate layers
        for (const entry of json) {
            // check if layer exists and needs updating
            let layer = this.markerLayers.get(entry.id);
            if (layer != null) {
                if (layer.timestamp === entry.timestamp) {
                    continue; // skip
                }
                // clear existing layer to rebuild
                this.squaremap.layerControl.removeOverlay(layer);
                // TODO
                // implement marker tracker instead of clearing
                // to reduce possible client side lag
            }

            // setup the layer
            layer = new SquaremapMarkerLayerGroup(entry);
            this.markerLayers.set(layer.id, layer);

            // setup the layer control
            if (entry.control === true) {
                this.squaremap.layerControl.addOverlay(entry.name, layer, entry.hide);
            }

            // setup the markers
            entry.markers.forEach((options) => SquaremapLayerFactory.factory(this.squaremap, layer, options));
        }
    }

    tick() {
        // refresh map tile layer
        if (this.squaremap.tick_count % this.tiles_update_interval === 0) {
            this.squaremap.layerControl.updateTileLayer();
        }
        // load and draw markers
        if (this.squaremap.tick_count % this.marker_update_interval === 0) {
            this.tickMarkers();
        }
    }

    tickMarkers() {
        this.squaremap.getJSON(
            `tiles/${this.name}/markers.json`,
            (json: SquaremapMarkerInterface[]) => {
                if (this === this.squaremap.worldList.curWorld) {
                    this.markers(json);
                }
            },
            true,
        );
    }

    unload() {
        this.squaremap.playerList.clearPlayerMarkers();
        const keys = Array.from(this.markerLayers.keys());
        for (let i = 0; i < keys.length; i++) {
            const layer = this.markerLayers.get(keys[i]);
            this.squaremap.layerControl.controls.removeLayer(layer!);
            layer!.remove();
            this.markerLayers.delete(keys[i]);
        }
    }
}
