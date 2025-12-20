import {Coords, DomEvent, DoneCallback, TileLayer as BaseTileLayer, Util} from 'leaflet';

export default class MapTileLayer extends BaseTileLayer {
    protected createTile(coords: Coords, done: DoneCallback): HTMLElement {
        const tile = document.createElement('img');

        //Once image has loaded revoke the object URL as we don't need it anymore
        DomEvent.on(tile, 'load', () => {
            URL.revokeObjectURL(tile.src);
            this._tileOnLoad(done, tile);
        });
        DomEvent.on(tile, 'error', Util.bind(this._tileOnError, this, done, tile));

        if (this.options.crossOrigin || this.options.crossOrigin === '') {
            tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
        }

        tile.alt = '';
        tile.setAttribute('role', 'presentation');

        this.fetch(coords)
            .then((src) => tile.src = src)
            .catch((error) => this._tileOnError(done, tile, error));

        return tile;
    }

    protected async fetch(coords: Coords): Promise<string> {
        try {
            //Retrieve image via a fetch instead of just setting the src
            //This works around the fact that browsers usually don't make a request for an image that was previously loaded,
            //without resorting to changing the URL (which would break caching).
            const response = await fetch(this.getTileUrl(coords));

            //Call leaflet's error handler if request fails for some reason
            if (response.ok === false) {
                throw new Error('response error');
            }

            //Get image data and convert into object URL so it can be used as a src
            //Leaflet's onload listener will take it from here
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        }
        catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(String(error));
        }
    }
}