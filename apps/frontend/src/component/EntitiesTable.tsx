import EntityRow from '@/component/EntityRow';
import numberFormatter from '@/lib/numberFormater';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import {ReactElement} from 'react';

interface EntitiesTableOptionsInterface {
    entities: StatisticEntityInterface[];
    title: string;
}

export default function EntitiesTable({title, entities}: EntitiesTableOptionsInterface): ReactElement {
    return (
        <div>
            <h2 className="font-extrabold text-xl">{title} ({numberFormatter.format(entities.length)})</h2>
            <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr>
                    <th>Type</th>
                    <th>Dimension</th>
                    <th>X</th>
                    <th>Y</th>
                    <th>Z</th>
                </tr>
                </thead>
                <tbody>
                {entities.map((entity) => <EntityRow key={entity.uuid} entity={entity}/>)}
                </tbody>
            </table>
        </div>
    );
}