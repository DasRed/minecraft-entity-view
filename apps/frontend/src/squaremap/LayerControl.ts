import SquaremapBaseLayerGroup from '@/squaremap/layerGroup/BaseGroup';
import SquaremapPlayerLayerGroup from '@/squaremap/layerGroup/PlayerGroup';
import SquaremapMap from '@/squaremap/Map';
import SquaremapTileLayer from '@/squaremap/TileLayer';
import SquaremapWorld from '@/squaremap/World';
import {Control, Layer} from 'leaflet';

export default class SquaremapLayerControl {
    controls: Control.Layers;
    currentLayer: number;
    ignoreLayer: Layer | null             = null;
    playersLayer: SquaremapPlayerLayerGroup;
    squaremap: SquaremapMap;
    tileLayer1: SquaremapTileLayer | null = null;
    tileLayer2: SquaremapTileLayer | null = null;
    updateInterval: number;

    constructor(squaremap: SquaremapMap) {
        this.squaremap      = squaremap;
        this.currentLayer   = 0;
        this.updateInterval = 60;

        this.playersLayer = new SquaremapPlayerLayerGroup();

        this.controls = new Control.Layers({}, {}, {
            position:   'bottomright',
            sortLayers: true,
            // @ts-ignore
            sortFunction: (a: SquaremapBaseLayerGroup, b: SquaremapBaseLayerGroup) => a.order - b.order,
        })
            .addTo(this.squaremap.leafletMap);
    }

    addOverlay(name: string, layer: SquaremapBaseLayerGroup, hide: boolean) {
        this.controls.addOverlay(layer, name);
        if (this.shouldHide(layer, hide) !== true) {
            layer.addTo(this.squaremap.leafletMap);
        }
    }

    createTileLayer(world: SquaremapWorld): SquaremapTileLayer {
        const layer = new SquaremapTileLayer(`${this.squaremap.host}/tiles/${world.name}/{z}/{x}_{y}.png`, {
            tileSize:      512,
            minNativeZoom: 0,
            maxNativeZoom: world.zoom!.max,
            errorTileUrl:  '/images/clear.png',
        });

        layer.addTo(this.squaremap.leafletMap)
            // when all tiles are loaded, switch to this layer
             .addEventListener('load', () => this.switchTileLayer());

        return layer;
    }

    hideLayer(layer: SquaremapBaseLayerGroup) {
        if (layer !== this.ignoreLayer) {
            window.localStorage.setItem(`hide_${layer.id}`, 'true');
        }
    }

    removeOverlay(layer: Layer) {
        this.ignoreLayer = layer;
        this.controls.removeLayer(layer);
        layer.remove();
        this.ignoreLayer = null;
    }

    setupTileLayers(world: SquaremapWorld) {
        // setup the map tile layers
        // we need 2 layers to swap between for seamless refreshing
        if (this.tileLayer1 != null) {
            this.squaremap.leafletMap.removeLayer(this.tileLayer1);
        }
        if (this.tileLayer2 != null) {
            this.squaremap.leafletMap.removeLayer(this.tileLayer2);
        }
        this.tileLayer1 = this.createTileLayer(world);
        this.tileLayer2 = this.createTileLayer(world);

        // refresh player's control
        this.removeOverlay(this.playersLayer);
        if (world.player_tracker!.show_controls) {
            this.addOverlay(world.player_tracker!.label, this.playersLayer, world.player_tracker!.default_hidden);
        }
        this.playersLayer.order = world.player_tracker!.priority;
        this.playersLayer.setZIndex(world.player_tracker!.z_index);
    }

    shouldHide(layer: SquaremapBaseLayerGroup, def: boolean): boolean {
        const value = window.localStorage.getItem(`hide_${layer.id}`);
        return value == null ? def : value === 'true';
    }

    showLayer(layer: SquaremapBaseLayerGroup) {
        if (layer !== this.ignoreLayer) {
            window.localStorage.setItem(`hide_${layer.id}`, 'false');
        }
    }

    switchTileLayer() {
        // swap current tile layer
        if (this.currentLayer === 1) {
            this.tileLayer1?.setZIndex(0);
            this.tileLayer2?.setZIndex(1);
            this.currentLayer = 2;
        }
        else {
            this.tileLayer1?.setZIndex(1);
            this.tileLayer2?.setZIndex(0);
            this.currentLayer = 1;
        }
    }

    updateTileLayer() {
        if (this.currentLayer === 1) {
            this.tileLayer2?.redraw();
        }
        else {
            this.tileLayer1?.redraw();
        }
    }
}
