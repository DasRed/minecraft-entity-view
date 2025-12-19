import SquaremapBaseLayerGroup from '@/squaremap/layerGroup/BaseGroup';
import settings from '@/squaremap/settings';
import {CRS, LatLng, Map as LeafletMap, Point} from 'leaflet';
import SquaremapLayerControl from './LayerControl.js';
import SquaremapPlayerList from './PlayerList.js';
import SquaremapSidebar from './Sidebar.js';
import SquaremapWorldList from './WorldList.js';
import 'leaflet/dist/leaflet.css';
import './css/styles.css';

interface SquaremapOptionsInterface {
    centerOn?: { x: number; z: number; zoom?: number; };
    element: HTMLElement;
    host: string;
    onUpdateCoordinates?: (coordinates: Point) => void;
}

export default class SquaremapMap {
    element: HTMLElement;
    host: string;
    layerControl: SquaremapLayerControl;
    map: LeafletMap;
    options: SquaremapOptionsInterface;
    playerList: SquaremapPlayerList;
    scale: number      = 1;
    sidebar: SquaremapSidebar;
    tick_count: number = 1;
    worldList: SquaremapWorldList;

    constructor(options: SquaremapOptionsInterface) {
        this.options = options;
        this.host    = options.host;
        this.element = options.element;

        this.map = new LeafletMap(this.element, {
            crs:                CRS.Simple,
            center:             [0, 0],
            zoom:               0,
            attributionControl: false,
            preferCanvas:       true,
        });

        this.layerControl = new SquaremapLayerControl(this);
        this.sidebar      = new SquaremapSidebar(this, settings.ui.sidebar, true);
        this.playerList   = new SquaremapPlayerList(this, settings.ui.sidebar);
        this.worldList    = new SquaremapWorldList(this, settings.worlds);
        this.map.on('overlayadd', (e) => this.layerControl.showLayer(e.layer as SquaremapBaseLayerGroup))
            .on('overlayremove', (e) => this.layerControl.hideLayer(e.layer as SquaremapBaseLayerGroup))
            .on('click', () => this.playerList.followPlayerMarker(null))
            .on('dblclick', () => this.playerList.followPlayerMarker(null))
            .on('mousemove', (event) => {
                if (this.worldList.curWorld != null) {
                    this.options.onUpdateCoordinates?.(this.toPoint(event.latlng));
                }
            });

        this.worldList.loadInitialWorld(settings, (world) => {
            this.loop();
            this.centerOn(options.centerOn?.x ?? world.spawn!.x, options.centerOn?.z ?? world.spawn!.z, options.centerOn?.zoom ?? world.zoom!.def);
        });
    }

    centerOn(x: number, z: number, zoom: number) {
        this.map.setView(this.toLatLng(x, z), zoom);

        return this.map;
    }

    createElement(tag: string, id: string, parent?: Object): HTMLElement {
        const element  = document.createElement(tag);
        element.id     = id;
        // @ts-ignore
        element.parent = parent;
        return element;
    }

    createTextElement(tag: string, text: string) {
        const element = document.createElement(tag);
        element.appendChild(document.createTextNode(text));
        return element;
    }

    destroy(): this {
        this.map.remove();
        return this;
    }

    getJSON<T>(url: string, fn: (data: T) => void, cache: boolean = false) {
        fetch(`${this.host}/${url}`, {
            cache: cache ? 'default' : 'no-store',
        })
            .then(async (res) => {
                if (res.ok) {
                    fn(await res.json());
                }
            });
    }

    getUrlParam(query: string, def: any) {
        const url  = window.location.search.substring(1);
        const vars = url.split('&');
        for (let i = 0; i < vars.length; i++) {
            const param = vars[i].split('=');
            if (param[0] === query) {
                const value = param[1] === undefined ? '' : decodeURIComponent(param[1]);
                return value === '' ? def : value;
            }
        }
        return def;
    }

    loop() {
        if (document.visibilityState === 'visible') {
            this.tick();
            this.tick_count++;
        }
        setTimeout(() => this.loop(), 1000);
    }

    metersToPixels(num: number) {
        return num / this.scale;
    }

    pixelsToMeters(num: number) {
        return num * this.scale;
    }

    setScale(zoom: number) {
        this.scale = 1 / Math.pow(2, zoom);
    }

    tick() {
        // tick player tracker
        this.playerList.tick();
        // tick world
        this.worldList.curWorld!.tick();
    }

    toLatLng(x: number, z: number) {
        return new LatLng(this.pixelsToMeters(-z), this.pixelsToMeters(x));
        //return this.map.unproject([x, z], this.worldList.curWorld.zoom.max);
    }

    toPoint(latlng: { lng: number; lat: number; }) {
        return new Point(this.metersToPixels(latlng.lng), this.metersToPixels(-latlng.lat));
    }
}
