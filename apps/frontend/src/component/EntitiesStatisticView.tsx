import EntitiesTable from '@/component/EntitiesTable';
import EntitiesTypeCountTable from '@/component/EntitiesTypeCountTable';
import numberFormatter from '@/lib/numberFormater';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import MobToMobCategory from '@dasred/minecraft-entity-view-sdk/constant/MobToMobCategory';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import React, {ReactElement} from 'react';

interface EntitiesStatisticViewComponentOptionsInterface {
    result: StatisticsInterface;
}

export default function EntitiesStatisticViewComponent({result}:EntitiesStatisticViewComponentOptionsInterface ) :ReactElement {
    const entityMonsters  = result.entitiesList.filter((entity) => MobToMobCategory[entity.type] === MobCategoryEnum.MONSTER);
    const entityCreatures = result.entitiesList.filter((entity) => MobToMobCategory[entity.type] === MobCategoryEnum.CREATURE);
    const entityItems     = result.entitiesList.filter((entity) => MobToMobCategory[entity.type] === MobCategoryEnum.ITEM);
    const entityMisc      = result.entitiesList.filter((entity) => MobToMobCategory[entity.type] === MobCategoryEnum.MISC);
    const entitySpecial   = result.entitiesList.filter((entity) => MobToMobCategory[entity.type] === MobCategoryEnum.SPECIAL);

    return (
        <>
            <table className="min-w-max border-collapse rounded-lg shadow-md overflow-hidden">
                <thead className="bg-gray-200">
                <tr>
                    <th className="px-4 py-2 text-right font-semibold">Active</th>
                    <th className="px-4 py-2 text-right font-semibold">Total</th>
                    <th className="px-4 py-2 text-right font-semibold">Added</th>
                    <th className="px-4 py-2 text-right font-semibold">Updated</th>
                    <th className="px-4 py-2 text-right font-semibold">Deleted</th>
                    <th className="px-4 py-2 text-right font-semibold">Ambient</th>
                    <th className="px-4 py-2 text-right font-semibold">Axolotls</th>
                    <th className="px-4 py-2 text-right font-semibold">Water Ambient</th>
                    <th className="px-4 py-2 text-right font-semibold">Water Creature</th>
                    <th className="px-4 py-2 text-right font-semibold">Underground Water Creature</th>
                    <th className="px-4 py-2 text-right font-semibold">Unknown</th>
                </tr>
                </thead>
                <tbody>
                <tr className="odd:bg-gray-300 even:bg-gray-700/50">
                    <td className="px-4 py-2 text-right">{numberFormatter.format(result.count.active)}</td>
                    <td className="px-4 py-2 text-right">{numberFormatter.format(result.count.total)}</td>
                    <td className="px-4 py-2 text-right">{numberFormatter.format(result.count.added)}</td>
                    <td className="px-4 py-2 text-right">{numberFormatter.format(result.count.updated)}</td>
                    <td className="px-4 py-2 text-right">{numberFormatter.format(result.count.deleted)}</td>
                    <td className="px-4 py-2 text-right">{numberFormatter.format(result.count.mobCategory[MobCategoryEnum.AMBIENT])}</td>
                    <td className="px-4 py-2 text-right">{numberFormatter.format(result.count.mobCategory[MobCategoryEnum.AXOLOTLS])}</td>
                    <td className="px-4 py-2 text-right">{numberFormatter.format(result.count.mobCategory[MobCategoryEnum.WATER_AMBIENT])}</td>
                    <td className="px-4 py-2 text-right">{numberFormatter.format(result.count.mobCategory[MobCategoryEnum.WATER_CREATURE])}</td>
                    <td className="px-4 py-2 text-right">{numberFormatter.format(result.count.mobCategory[MobCategoryEnum.UNDERGROUND_WATER_CREATURE])}</td>
                    <td className="px-4 py-2 text-right">{numberFormatter.format(result.count.mobCategory[MobCategoryEnum.UNKNOWN])}</td>
                </tr>
                </tbody>
            </table>

            <div className="grid grid-cols-6 gap-3 mt-5">
                <EntitiesTable title="Monster" entities={entityMonsters}/>
                <EntitiesTable title="Creatures" entities={entityCreatures}/>
                <EntitiesTable title="Items" entities={entityItems}/>
                <EntitiesTable title="Misc" entities={entityMisc}/>
                <EntitiesTable title="Special" entities={entitySpecial}/>
                <EntitiesTypeCountTable entities={result.entitiesList}/>
            </div>
        </>
    );
}