import store from '@/lib/store';
import EntitiesStatisticComparatorDimension from '@/service/entitiesStatistic/comparator/Dimension';
import EntitiesStatisticComparatorFirstSeen from '@/service/entitiesStatistic/comparator/FirstSeen';
import EntitiesStatisticComparatorItemCount from '@/service/entitiesStatistic/comparator/ItemCount';
import EntitiesStatisticComparatorName from '@/service/entitiesStatistic/comparator/Name';
import EntitiesStatisticComparatorPosition from '@/service/entitiesStatistic/comparator/Position';
import EntitiesStatisticComparatorRemove from '@/service/entitiesStatistic/comparator/Remove';
import EntitiesStatisticComparatorUUID from '@/service/entitiesStatistic/comparator/UUID';
import EntitiesStatisticUpdaterSorter from '@/service/entitiesStatistic/Sorter';
import EntityOrderTypeEnum from '@dasred/minecraft-entity-view-sdk/constant/EntityOrderTypeEnum';

const sorter = new EntitiesStatisticUpdaterSorter(new EntitiesStatisticComparatorUUID(), {
    [EntityOrderTypeEnum.DEFAULT]:   [new EntitiesStatisticComparatorRemove(store), new EntitiesStatisticComparatorItemCount(), new EntitiesStatisticComparatorFirstSeen(store), new EntitiesStatisticComparatorName(), new EntitiesStatisticComparatorDimension(), new EntitiesStatisticComparatorPosition()],
    [EntityOrderTypeEnum.NAME]:      [new EntitiesStatisticComparatorName(), new EntitiesStatisticComparatorDimension(), new EntitiesStatisticComparatorPosition()],
    [EntityOrderTypeEnum.DIMENSION]: [new EntitiesStatisticComparatorDimension(), new EntitiesStatisticComparatorName(), new EntitiesStatisticComparatorPosition()],
    [EntityOrderTypeEnum.POSITION]:  [new EntitiesStatisticComparatorPosition(), new EntitiesStatisticComparatorName(), new EntitiesStatisticComparatorDimension()],
});

export default sorter;