import Translator from '../../libs/Translator';
import CartTableJsonApiBodyReader from '../reader/CartTableJsonApiBodyReader';

export default class CartTableTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data, included) {
        const bodyReader = new CartTableJsonApiBodyReader(data, included);

        const id         = bodyReader.value('id');
        const shopId     = bodyReader.value('shops');
        const name       = bodyReader.value('name');
        const createTime = bodyReader.value('createTime');
        const updateTime = bodyReader.value('updateTime');
        const statusTime = bodyReader.value('statusTime');
        const status     = bodyReader.value('status');

        return {
            id,
            shopId,
            name,
            createTime,
            updateTime,
            statusTime,
            status
        };
    }
}