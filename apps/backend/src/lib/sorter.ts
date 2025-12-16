import store from '@/lib/store';
import ComparatorDimension from '@/service/comparator/Dimension';
import ComparatorFirstSeen from '@/service/comparator/FirstSeen';
import ComparatorItemCount from '@/service/comparator/ItemCount';
import ComparatorName from '@/service/comparator/Name';
import ComparatorPosition from '@/service/comparator/Position';
import ComparatorRemove from '@/service/comparator/Remove';
import ComparatorUUID from '@/service/comparator/UUID';
import EntitiesStatisticUpdaterSorter from '@/service/entitiesStatisticUpdater/Sorter';
import EntityOrderTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityOrderTypeEnum';

const sorter = new EntitiesStatisticUpdaterSorter(new ComparatorUUID(), {
    [EntityOrderTypeEnum.DEFAULT]:   [new ComparatorRemove(store), new ComparatorItemCount(), new ComparatorFirstSeen(store), new ComparatorName(), new ComparatorDimension(), new ComparatorPosition()],
    [EntityOrderTypeEnum.NAME]:      [new ComparatorName(), new ComparatorDimension(), new ComparatorPosition()],
    [EntityOrderTypeEnum.DIMENSION]: [new ComparatorDimension(), new ComparatorName(), new ComparatorPosition()],
    [EntityOrderTypeEnum.POSITION]:  [new ComparatorPosition(), new ComparatorName(), new ComparatorDimension()],
});

export default sorter;