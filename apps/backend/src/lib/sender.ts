import updater from '@/lib/updater';
import wss from '@/lib/wss';
import DifferenceSenderCount from '@/service/differenceSender/Count';
import DifferenceSenderEntity from '@/service/differenceSender/Entity';
import DifferenceSenderHistory from '@/service/differenceSender/History';
import DifferenceSenderTypeCount from '@/service/differenceSender/TypeCount';
import DifferenceSenderHandler from '@/service/DifferenceSenderHandler';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';

const sender = new DifferenceSenderHandler(updater, [
    new DifferenceSenderCount(wss),
    new DifferenceSenderHistory(wss),
    new DifferenceSenderTypeCount(wss),
    ...Object.values(MobCategoryEnum).map((key) => new DifferenceSenderEntity(wss, key)),
]);

export default sender;

