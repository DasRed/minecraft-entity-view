import useMap from '@/component/map/useMap';
import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';
import APIDimensionInterface from '@dasred/minecraft-entity-view-sdk/model/api/DimensionInterface';
import {useState} from 'react';

interface UseDimensionResultInterface {
    dimension: APIDimensionInterface;
    setDimension: (dimensionId: DimensionEnum) => void;
}

export default function useDimension(dimensions: APIDimensionInterface[]): UseDimensionResultInterface {
    const map                           = useMap();
    const [dimensionId, setDimensionId] = useState<DimensionEnum>(map.getDimensionId());

    function setDimension(dimensionIdNew: DimensionEnum) {
        if (dimensionIdNew !== dimensionId) {
            map.setDimensionId(dimensionIdNew);
            setDimensionId(dimensionIdNew);
        }
    }

    const dimension = dimensions.find(({id}) => id === dimensionId) ?? dimensions.find(({id}) => id === DimensionEnum.OVERWORLD)!;

    return {dimension, setDimension};
}