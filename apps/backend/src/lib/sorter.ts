import ComparatorDimension from '@/service/comparator/Dimension';
import ComparatorFirstSeen from '@/service/comparator/FirstSeen';
import ComparatorItemCount from '@/service/comparator/ItemCount';
import ComparatorName from '@/service/comparator/Name';
import ComparatorPosition from '@/service/comparator/Position';
import ComparatorRemove from '@/service/comparator/Remove';
import ComparatorUUID from '@/service/comparator/UUID';
import EntitiesStatisticUpdaterSorter from '@/service/entitiesStatisticUpdater/Sorter';

const sorter = new EntitiesStatisticUpdaterSorter(new ComparatorUUID(), {
    default:   [
        new ComparatorRemove(),
        new ComparatorItemCount(),
        new ComparatorFirstSeen(),
        new ComparatorName(),
        new ComparatorDimension(),
        new ComparatorPosition(),
    ],
    name:      [
        new ComparatorName(),
        new ComparatorDimension(),
        new ComparatorPosition(),
    ],
    dimension: [
        new ComparatorDimension(),
        new ComparatorName(),
        new ComparatorPosition(),
    ],
    position:  [
        new ComparatorPosition(),
        new ComparatorName(),
        new ComparatorDimension(),
    ],
});

export default sorter;