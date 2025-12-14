import StatisticCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/CountInterface';
import {get} from 'lodash-es';

export default class SummaryConfigEntry {
    public command: string;
    public label: string;
    public path: string;
    public visible: boolean;

    constructor({label, command, path, visible = true}: { label: string, command: string, path: string, visible?: boolean }) {
        this.label   = label;
        this.command = command;
        this.path    = path;
        this.visible = visible;
    }

    get(count: StatisticCountInterface): number {
        return get(count, this.path);
    }
}