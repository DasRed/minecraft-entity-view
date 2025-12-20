import MapTileLayer from '@/service/map/TileLayer';
import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import {Map as LeafletMap} from 'leaflet';

interface MapTileLayerHandlerOptions {
    dimensionId: DimensionEnum;
    fallbackImage?: string;
    leafletMap: LeafletMap;
    refreshInterval?: number;
    tileSize?: number;
    urlTemplate?: string;
}

export default class MapTileLayerHandler {
    protected dimensionId: DimensionEnum;
    protected fallbackImage: string;
    protected interval?: NodeJS.Timeout;
    protected layerCurrentIndex: number;
    protected layers: (MapTileLayer | null)[];
    protected leafletMap: LeafletMap;
    protected tileSize: number;
    protected urlTemplate: string;

    constructor(options: MapTileLayerHandlerOptions) {
        this.dimensionId       = options.dimensionId;
        this.fallbackImage     = options.fallbackImage ?? '/map/empty.png';
        this.layerCurrentIndex = 0;
        this.layers            = [null, null]; // pre init with default 2 layers, we need 2 layers to swap between for seamless refreshing for image updates from server
        this.leafletMap        = options.leafletMap;
        this.tileSize          = options.tileSize ?? 512;
        this.urlTemplate       = options.urlTemplate ?? '/tiles/{dimensionId}/{z}/{x}_{y}.png';

        this.leafletMap.whenReady(() => {
            this.update();
            this.interval = setInterval(() => this.redraw(), options.refreshInterval ?? 60_000);
        });
    }

    public destroy(): this {
        clearInterval(this.interval);

        return this;
    }

    protected redraw(): this {
        this.layers.forEach((layer, index) => this.layerCurrentIndex !== index && layer?.redraw());

        return this;
    }

    public setDimensionId(dimensionId: DimensionEnum): this {
        this.dimensionId = dimensionId;
        return this.update();
    }

    protected switch(current: number): this {
        this.layerCurrentIndex = current;
        this.layers.forEach((layer, index) => layer?.setZIndex(current === index ? 1 : 0));
        return this;
    }

    public update(): this {
        this.layers = this.layers.map((layer, index) => {
            // drop the old layers
            if (layer !== null) {
                this.leafletMap.removeLayer(layer);
            }

            // create the new layers
            layer = new MapTileLayer(this.urlTemplate.replace('{dimensionId}', this.dimensionId.replace(':', '_')), {
                tileSize:      this.tileSize,
                minNativeZoom: this.leafletMap.getMinZoom(),
                maxNativeZoom: this.leafletMap.getMaxZoom(),
                errorTileUrl:  this.fallbackImage,
            });

            // when all tiles are loaded, switch to this layer
            layer.addTo(this.leafletMap).addEventListener('load', () => this.switch(index));

            return layer;
        });

        return this;
    }
}
