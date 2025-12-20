import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';

const DimensionImages: Record<string, string> = {
    [DimensionEnum.OVERWORLD]: '/dimension/{size}/overworld.png',
    [DimensionEnum.NETHER]:    '/dimension/{size}/the_nether.png',
    [DimensionEnum.END]:       '/dimension/{size}/the_end.png',
    UNKNOWN:                   '/dimension/{size}/unknown.png',
};

export default DimensionImages;