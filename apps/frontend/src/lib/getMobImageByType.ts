import MobImages from '@/constant/MobImages';

export default function getMobImageByType(type: string): string {
    return (MobImages[type] ?? `/item/${type.replace(':', '/')}.png`).replace('{size}', '16x16');
}