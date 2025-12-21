import MapControlContainer from '@/component/map/control/Container';
import MapControlToggleIcon from '@/component/map/control/ToggleIcon';
import MapLayerEntities from '@/component/map/layer/Entities';
import MapLayerPlayers from '@/component/map/layer/Players';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';
import APIPlayersInterface from '@dasred/minecraft-entity-view-sdk/model/api/PlayersInterface';
import StatisticsInterface from '@dasred/minecraft-entity-view-sdk/model/StatisticsInterface';
import {ReactElement, useState} from 'react';

interface MapEntitiesIconOptionsInterface {
    players: APIPlayersInterface;
    statistic: StatisticsInterface;
}

export default function MapControlEntities({players, statistic}: MapEntitiesIconOptionsInterface): ReactElement {
    const [showPlayers, setShowPlayers]   = useState<boolean>(false);
    const [showMonster, setShowMonster]   = useState<boolean>(false);
    const [showCreature, setShowCreature] = useState<boolean>(false);
    const [showItem, setShowItem]         = useState<boolean>(true);
    const [showMisc, setShowMisc]         = useState<boolean>(false);
    const [showOther, setShowOther]       = useState<boolean>(false);

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