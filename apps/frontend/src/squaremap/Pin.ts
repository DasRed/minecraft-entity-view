import SquaremapMap from '@/squaremap/Map';

export default class SquaremapPin {
    element: HTMLImageElement;
    pinned: boolean;

    constructor(squaremap: SquaremapMap, def: boolean) {
        this.pinned  = def;
        this.element = squaremap.createElement('img', 'pin', this) as HTMLImageElement;
        this.element.addEventListener('click', () => this.toggle());

        this.pin(this.pinned);
    }

    pin(pin: boolean) {
        this.pinned            = pin;
        this.element.className = pin ? 'pinned' : 'unpinned';
        this.element.src       = `images/${this.element.className}.png`;
    }

    toggle() {
        this.pin(!this.pinned);
    }
}
