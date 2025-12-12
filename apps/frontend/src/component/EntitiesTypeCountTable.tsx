import MobImages from '@/constant/MobImages';
import collator from '@/lib/collator';
import numberFormatter from '@/lib/numberFormater';
import EntityTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityTypeEnum';
import StatisticEntityInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticEntityInterface';
import React from 'react';

interface EntitiesTypeCountTableResultInterface {
    [key: string]: {
        type: string;
        name: string;
        count: 0;
    };
}

interface EntitiesCountTableOptionsInterface {
    entities: StatisticEntityInterface[];
}

export default function EntitiesTypeCountTable({entities}: EntitiesCountTableOptionsInterface): React.ReactElement {
    const result = Object
        .values(
            entities.reduce((acc, entity) => {
                const type = entity.type === EntityTypeEnum.ITEM ? entity.item.type : entity.type;

                if (acc[type] === undefined) {
                    acc[type] = {
                        type,
                        count: 0,
                        name:  entity.type === EntityTypeEnum.ITEM ? entity.item.name : entity.name,
                    };
                }
                acc[type].count++;
                return acc;
            }, {} as EntitiesTypeCountTableResultInterface),
        )
        .sort((entityA, entityB) => {
            if (entityA.count === entityB.count) {
                return collator.compare(entityA.type, entityB.type);
            }

            return entityB.count - entityA.count;
        });

    return (
        <div>
            <h2 className="font-extrabold text-xl">Entities Type Count</h2>
            <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr>
                    <th>Type</th>
                    <th>Count</th>
                </tr>
                </thead>
                <tbody>
                {result.map((entity) => (
                    <tr key={entity.type} className="border-b border-default">
                        <td className="flex flex-row items-center">
                            {MobImages[entity.type] && <img src={MobImages[entity.type].replace('{size}', '16x16')} className="w-4 h-4 mr-1" alt=""/>}
                            {MobImages[entity.type] === undefined && <div className="w-4 h-4 mr-1 bg-amber-400/50"/>}
                            {entity.name}
                        </td>
                        <td>{numberFormatter.format(entity.count)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}