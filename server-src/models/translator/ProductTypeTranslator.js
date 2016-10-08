import Translator from '../../libs/Translator';
import ProductTypeJsonApiBodyReader from '../reader/ProductTypeJsonApiBodyReader';

export default class ProductTypeTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {
        const bodyReader = new ProductTypeJsonApiBodyReader(data);

        let id         = bodyReader.value('id');
        let name       = bodyReader.value('name');
        let category   = bodyReader.value('category');
        let updateTime = bodyReader.value('updateTime');
        let createTime = bodyReader.value('createTime');
        let statusTime = bodyReader.value('statusTime');
        let status     = bodyReader.value('status');


        return { id, name, category, updateTime, createTime, statusTime, status };
    }
}