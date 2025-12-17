import CommandType from '@dasred/minecraft-entity-view-sdk/model/CommandType';
import StatisticCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/CountInterface';
import HistoryCountEntryInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountEntryInterface';
import HistoryCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/HistoryCountInterface';
import {get} from 'lodash-es';

export default class SummaryConfigEntry {
    public commandHistory: CommandType;
    public commandValue: CommandType;
    public label: string;
    public path: string;
    public visible: boolean;

    constructor({label, commandValue, commandHistory, path, visible = true}: { label: string, commandValue: CommandType, commandHistory: CommandType, path: string, visible?: boolean }) {
        this.label          = label;
        this.commandHistory = commandHistory;
        this.commandValue   = commandValue;
        this.path           = path;
        this.visible        = visible;
    }

    get(count: StatisticCountInterface): number;
    get(count: HistoryCountInterface): HistoryCountEntryInterface[];
    get(count: StatisticCountInterface | HistoryCountInterface) {
        return get(count, this.path);
    }
}