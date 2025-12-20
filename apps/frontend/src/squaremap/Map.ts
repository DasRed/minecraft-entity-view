import SquaremapBaseLayerGroup from '@/squaremap/layerGroup/BaseGroup';
import settings from '@/squaremap/settings';
import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {CRS, LatLng, Map as LeafletMap, Point} from 'leaflet';
import SquaremapLayerControl from './LayerControl.js';
import SquaremapPlayerList from './PlayerList.js';
import SquaremapSidebar from './Sidebar.js';
import SquaremapWorldList from './WorldList.js';
import 'leaflet/dist/leaflet.css';
import './css/styles.css';

interface SquaremapOptionsInterface {
    dimension?: DimensionEnum;
    dimensions: APIDimensionInterface[];
    element: HTMLElement;
    /** @deprecated */
    host: string;
}

export default class SquaremapMap {
    protected dimension: DimensionEnum;
    protected dimensions: APIDimensionInterface[];
    protected element: HTMLElement;

    /** @deprecated */
    public host: string;
    public layerControl: SquaremapLayerControl;
    public leafletMap: LeafletMap;
    public playerList: SquaremapPlayerList;
    public scale: number      = 1;
    public sidebar: SquaremapSidebar;
    public tick_count: number = 1;
    public worldList: SquaremapWorldList;

    constructor(options: SquaremapOptionsInterface) {
        this.host       = options.host;
        this.element    = options.element;
        this.dimensions = options.dimensions;
        this.dimension  = options.dimension ?? DimensionEnum.OVERWORLD;

        this.leafletMap = new LeafletMap(this.element, {
            crs:                CRS.Simple,
            center:             [0, 0],
            zoom:               0,
            attributionControl: false,
            preferCanvas:       false,
            zoomControl:        false,
        });

        this.layerControl = new SquaremapLayerControl(this);
        this.sidebar      = new SquaremapSidebar(this, settings.ui.sidebar, true);
        this.playerList   = new SquaremapPlayerList(this, settings.ui.sidebar);
        this.worldList    = new SquaremapWorldList(this, settings.worlds);
        this.leafletMap
            .on('overlayadd', (e) => this.layerControl.showLayer(e.layer as SquaremapBaseLayerGroup))
            .on('overlayremove', (e) => this.layerControl.hideLayer(e.layer as SquaremapBaseLayerGroup))
            .on('click', () => this.playerList.followPlayerMarker(null))
            .on('dblclick', () => this.playerList.followPlayerMarker(null));

        this.worldList.loadInitialWorld(settings, () => this.loop());
    }

    /**
     * @deprecated
     */
    public centerOn(x: number, z: number, zoom: number) {
        this.leafletMap.setView(this.toLatLng(x, z), zoom);

        return this.leafletMap;
    }

    /**
     * @deprecated
     */
    public createElement(tag: string, id: string, parent?: Object): HTMLElement {
        const element  = document.createElement(tag);
        element.id     = id;
        // @ts-ignore
        element.parent = parent;
        return element;
    }

    /**
     * @deprecated
     */
    public createTextElement(tag: string, text: string) {
        const element = document.createElement(tag);
        element.appendChild(document.createTextNode(text));
        return element;
    }

    public destroy(): this {
        this.leafletMap.remove();
        return this;
    }

    public getDimension(): DimensionEnum {
        return this.dimension;
    }

    /**
     * @deprecated
     */
    public getJSON<T>(url: string, fn: (data: T) => void, cache: boolean = false) {
        fetch(`${this.host}/${url}`, {
            cache: cache ? 'default' : 'no-store',
        })
            .then(async (res) => {
                if (res.ok) {
                    fn(await res.json());
                }
            });
    }

    /**
     * @deprecated
     */
    public getUrlParam(query: string, def: any) {
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

    /**
     * @deprecated
     */
    public loop(): this {
        if (document.visibilityState === 'visible') {
            this.tick();
            this.tick_count++;
        }
        setTimeout(() => this.loop(), 1000);

        return this;
    }

    public metersToPixels(num: number): number {
        return num / this.scale;
    }

    public pixelsToMeters(num: number): number {
        return num * this.scale;
    }

    public setDimension(dimension: DimensionEnum): this {
        this.dimension = dimension;

        return this;
    }

    public setScale(zoom: number): this {
        this.scale = 1 / Math.pow(2, zoom);
        return this;
    }

    /**
     * @deprecated
     */
    public tick() {
        // tick player tracker
        this.playerList.tick();
        // tick world
        this.worldList.curWorld!.tick();
    }

    public toLatLng(x: number, z: number): LatLng {
        return new LatLng(this.pixelsToMeters(-z), this.pixelsToMeters(x));
    }

    public toPoint(latlng: { lng: number; lat: number; }): Point {
        return new Point(this.metersToPixels(latlng.lng), this.metersToPixels(-latlng.lat));
    }
}
