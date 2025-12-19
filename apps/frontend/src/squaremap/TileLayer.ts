import {Coords, DomEvent, DoneCallback, TileLayer as BaseTileLayer, Util} from 'leaflet';

export default class SquaremapTileLayer extends BaseTileLayer {
    _initContainer() {
        if (this.getPane() === undefined) {
            return;
        }

        // @ts-ignore
        super._initContainer();
    }

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

        //Retrieve image via a fetch instead of just setting the src
        //This works around the fact that browsers usually don't make a request for an image that was previously loaded,
        //without resorting to changing the URL (which would break caching).
        fetch(this.getTileUrl(coords))
            .then((res) => {
                //Call leaflet's error handler if request fails for some reason
                if (!res.ok) {
                    this._tileOnError(done, tile, new Error('response error'));
                    return;
                }

                //Get image data and convert into object URL so it can be used as a src
                //Leaflet's onload listener will take it from here
                res.blob().then((blob) => tile.src = URL.createObjectURL(blob));
            })
            .catch(() => this._tileOnError(done, tile, new Error('fetch error')));

        return tile;
    }
}