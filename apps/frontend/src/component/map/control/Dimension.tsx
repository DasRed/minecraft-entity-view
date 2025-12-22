import MapControlToggleIcon from '@/component/map/control/ToggleIcon';
import useDimensionUpdate from '@/component/map/provider/dimension/useUpdate';
import useDimensions from '@/component/map/provider/dimensions/use';
import DimensionImages from '@/constant/DimensionImages';
import DimensionName from '@/constant/DimensionName';
import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import {ReactElement} from 'react';

const ORDER = {
    [DimensionEnum.OVERWORLD]: 0,
    [DimensionEnum.NETHER]:    1,
    [DimensionEnum.END]:       2,
};

export default function MapControlDimension(): ReactElement {
    const dimensions                = useDimensions();
    const {dimension, setDimension} = useDimensionUpdate();

    return (
        <>
            {dimensions.sort((dimensionA, dimensionB) => (ORDER[dimensionA.id] ?? 99) - (ORDER[dimensionB.id] ?? 99)).map((entry) => (
                <MapControlToggleIcon
                    key={entry.id}
                    title={DimensionName[entry.id] ?? entry.id}
                    icon={(DimensionImages[entry.id] ?? DimensionImages.UNKNOWN).replace('{size}', `32x32`)}
                    onToggle={() => setDimension(entry)}
                    active={dimension.id === entry.id}
                    disabled={dimension.id === entry.id}
                />
            ))}
        </>
    );
}