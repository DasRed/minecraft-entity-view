import EntitySummaryValue from '@/component/EntitySummaryValue';
import SummaryConfig from '@dasred/minecraft-entity-view-sdk/constant/SummaryConfig';
import StatisticCountInterface from '@dasred/minecraft-entity-view-sdk/model/statistic/CountInterface';
import {ReactElement} from 'react';

interface EntitySummaryOptionInterface {
    count: StatisticCountInterface;
}

const summaryConfig = SummaryConfig.filter((entry) => entry.visible);

export default function EntitySummary({count}: EntitySummaryOptionInterface): ReactElement {
    return (
        <table className="min-w-max border-collapse rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-200">
            <tr>
                {summaryConfig.map((entry) => <th key={entry.label} className="px-4 py-2 text-right font-semibold">{entry.label}</th>)}
            </tr>
            </thead>
            <tbody>
            <tr className="odd:bg-gray-300 even:bg-gray-700/50">
                {summaryConfig.map((entry) => (
                    <td key={entry.label} className="px-4 py-2 text-right">
                        <EntitySummaryValue command={entry.command} initial={entry.get(count)}></EntitySummaryValue>
                    </td>
                ))}
            </tr>
            </tbody>
        </table>
    );
}