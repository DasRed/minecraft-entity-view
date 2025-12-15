import updater from '@/lib/updater';
import wss from '@/lib/wss';
import DifferenceSenderCountAndHistory from '@/service/differenceSender/CountAndHistory';
import DifferenceSenderEntity from '@/service/differenceSender/Entity';
import DifferenceSenderTypeCount from '@/service/differenceSender/TypeCount';
import DifferenceSenderHandler from '@/service/DifferenceSenderHandler';
import MobCategoryEnum from '@dasred/minecraft-entity-view-sdk/constant/MobCategoryEnum';

const sender = new DifferenceSenderHandler(updater, [
    new DifferenceSenderCountAndHistory(wss),
    new DifferenceSenderTypeCount(wss),
    ...Object.values(MobCategoryEnum).map((key) => new DifferenceSenderEntity(wss, key)),
]);

export default sender;

