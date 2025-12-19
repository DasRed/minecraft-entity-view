import SquaremapMap from '@/squaremap/Map';

export default class SquaremapFieldset {
    element: HTMLFieldSetElement;
    legend: HTMLLegendElement;

    constructor(squaremap: SquaremapMap, id: string, title: string) {
        this.element = squaremap.createElement('fieldset', id) as HTMLFieldSetElement;
        this.legend  = squaremap.createTextElement('legend', title) as HTMLLegendElement;
        this.element.appendChild(this.legend);
    }
}
