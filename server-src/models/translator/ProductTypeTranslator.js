import Translator from '../../libs/Translator';
import ProductTypeJsonApiBodyReader from '../reader/ProductTypeJsonApiBodyReader';

export default class ProductTypeTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {
        const bodyReader = new ProductTypeJsonApiBodyReader(data);

        const id         = bodyReader.value('id');
        const name       = bodyReader.value('name');
        const category   = bodyReader.value('category');
        const updateTime = bodyReader.value('updateTime');
        const createTime = bodyReader.value('createTime');
        const statusTime = bodyReader.value('statusTime');
        const status     = bodyReader.value('status');
        const userId     = bodyReader.value('users');

        return { id, name, category, updateTime, createTime, statusTime, status, userId };
    }
}