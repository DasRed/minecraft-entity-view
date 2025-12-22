import MapTileLayerHandler from '@/service/map/TileLayerHandler';
import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {CRS, LatLng, Map as LeafletMap, Point} from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapZoomOptionsInterface {
    current?: number;
    max?: number;
    min?: number;
    nativeMax?: number;
    nativeMin?: number;
}

interface MapOptionsInterface {
    dimensionId?: DimensionEnum;
    dimensions: APIDimensionInterface[];
    element: HTMLElement;
    nativeZoomMax?: number;
    nativeZoomMin?: number;
    urlTemplate?: string;
    zoom?: MapZoomOptionsInterface;
}

export default class Map {
    protected dimensionId: DimensionEnum;
    protected dimensions: APIDimensionInterface[];
    protected element: HTMLElement;
    public leafletMap: LeafletMap;
    protected tileLayerHandler: MapTileLayerHandler;

    protected get scale(): number {
        return 1 / Math.pow(2, this.tileLayerHandler.nativeZoomMax);
    }

    constructor(options: MapOptionsInterface) {
        this.element     = options.element;
        this.dimensions  = options.dimensions;
        this.dimensionId = options.dimensionId ?? DimensionEnum.OVERWORLD;

        this.leafletMap = new LeafletMap(this.element, {
            crs:                CRS.Simple,
            center:             [0, 0],
            zoom:               options.zoom?.current ?? 0,
            attributionControl: false,
            preferCanvas:       false,
            zoomControl:        false,
            minZoom:            options.zoom?.min ?? 0,
            maxZoom:            options.zoom?.max ?? 3,
        });

        this.tileLayerHandler = new MapTileLayerHandler({
            leafletMap:    this.leafletMap,
            dimensionId:   this.dimensionId,
            urlTemplate:   options.urlTemplate,
            nativeZoomMin: options.zoom?.nativeMin ?? 0,
            nativeZoomMax: options.zoom?.nativeMax ?? 3,
        });

        this.leafletMap.whenReady(() => this.setViewToSpawn());
    }

    public destroy(): this {
        this.tileLayerHandler.destroy();
        this.leafletMap.remove();
        return this;
    }

    public getCurrentDimension(): APIDimensionInterface {
        return this.dimensions.find(({id}) => id === this.dimensionId) ?? this.dimensions.find(({id}) => id === DimensionEnum.OVERWORLD)!;
    }

    public metersToPixels(num: number): number {
        return num / this.scale;
    }

    public pixelsToMeters(num: number): number {
        return num * this.scale;
    }

    public setDimensionId(dimensionId: DimensionEnum): this {
        this.dimensionId = dimensionId;
        this.tileLayerHandler.setDimensionId(dimensionId);

        return this.setViewToSpawn();
    }

    protected setViewToSpawn(): this {
        const dimension = this.getCurrentDimension();
        this.leafletMap.setView(this.toLatLng(dimension.spawn.x, dimension.spawn.z));

        return this;
    }

    public toLatLng(x: number, z: number): LatLng {
        return new LatLng(this.pixelsToMeters(-z), this.pixelsToMeters(x));
    }

    public toPoint(latlng: { lng: number; lat: number; }): Point {
        return new Point(this.metersToPixels(latlng.lng), this.metersToPixels(-latlng.lat));
    }
}
