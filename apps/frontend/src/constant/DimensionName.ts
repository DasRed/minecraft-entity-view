import DimensionEnum from '@dasred/minecraft-entity-view-sdk/constant/DimensionEnum';

const DimensionName: { [key: string]: string } = {
    [DimensionEnum.OVERWORLD]: 'Oberwelt',
    [DimensionEnum.NETHER]:    'Nether',
    [DimensionEnum.END]:       'Ende',
} as const;

export default DimensionName;