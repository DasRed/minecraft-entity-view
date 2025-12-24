import EntityTypeEnum from '../../../constant/EntityTypeEnum';
import APIEntityBaseInterface from './BaseInterface';

interface APIEntityItemInterface extends APIEntityBaseInterface {
    item: {
        name: string;
        type: string;
        count: number;
    };
    type: EntityTypeEnum.ITEM;
}

export default APIEntityItemInterface;