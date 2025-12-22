import MapControlContainer from '@/component/map/control/Container';
import MapControlToggleIcon from '@/component/map/control/ToggleIcon';
import MapLayerEntities from '@/component/map/layer/Entities';
import MapLayerPlayers from '@/component/map/layer/Players';
import setting from '@/lib/setting';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import APIPlayersInterface from '@dasred/minecraft-entity-view-sdk/model/api/PlayersInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {ReactElement, useEffect, useState} from 'react';

interface MapEntitiesIconOptionsInterface {
    players: APIPlayersInterface;
    statistic: StatisticsInterface;
}

export default function MapControlEntities({players, statistic}: MapEntitiesIconOptionsInterface): ReactElement {
    const [showPlayers, setShowPlayers]   = useState<boolean>(setting.get('players.visible', false));
    const [showMonster, setShowMonster]   = useState<boolean>(setting.get('monsters.visible', true));
    const [showCreature, setShowCreature] = useState<boolean>(setting.get('creatures.visible', true));
    const [showItem, setShowItem]         = useState<boolean>(setting.get('items.visible', false));
    const [showMisc, setShowMisc]         = useState<boolean>(setting.get('misc.visible', false));
    const [showOther, setShowOther]       = useState<boolean>(setting.get('other.visible', false));

    useEffect(() => void setting.set('players.visible', showPlayers), [showPlayers]);
    useEffect(() => void setting.set('monsters.visible', showMonster), [showMonster]);
    useEffect(() => void setting.set('creatures.visible', showCreature), [showCreature]);
    useEffect(() => void setting.set('items.visible', showItem), [showItem]);
    useEffect(() => void setting.set('misc.visible', showMisc), [showMisc]);
    useEffect(() => void setting.set('other.visible', showOther), [showOther]);

    return (
        <MapControlContainer>
            <MapControlToggleIcon title="Player" icon="/category/32x32/player.png" active={showPlayers} onToggle={setShowPlayers}/>
            <MapControlToggleIcon title="Monster" icon="/category/32x32/monster.png" active={showMonster} onToggle={setShowMonster}/>
            <MapControlToggleIcon title="Creature" icon="/category/32x32/creature.png" active={showCreature} onToggle={setShowCreature}/>
            <MapControlToggleIcon title="Item" icon="/category/32x32/item.png" active={showItem} onToggle={setShowItem}/>
            <MapControlToggleIcon title="Misc" icon="/category/32x32/misc.png" active={showMisc} onToggle={setShowMisc}/>
            <MapControlToggleIcon title="Other" icon="/category/32x32/other.png" active={showOther} onToggle={setShowOther}/>

            <MapLayerPlayers players={players} visible={showPlayers}/>
            <MapLayerEntities statistic={statistic} category={MobCategoryEnum.MONSTER} visible={showMonster}/>
            <MapLayerEntities statistic={statistic} category={MobCategoryEnum.CREATURE} visible={showCreature}/>
            <MapLayerEntities statistic={statistic} category={MobCategoryEnum.ITEM} visible={showItem}/>
            <MapLayerEntities statistic={statistic} category={MobCategoryEnum.MISC} visible={showMisc}/>
            <MapLayerEntities statistic={statistic} category={MobCategoryEnum.OTHER} visible={showOther}/>
        </MapControlContainer>
    );
}