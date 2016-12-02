import Translator from '../../libs/Translator';
import CategoryJsonApiBodyReader from '../reader/CategoryJsonApiBodyReader';

export default class CategoryTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {
        const bodyReader = new CategoryJsonApiBodyReader(data);
        
        let id         = bodyReader.value('id');
        let name       = bodyReader.value('name');
        let status     = bodyReader.value('status');
        let updateTime = bodyReader.value('updateTime');
        let createTime = bodyReader.value('createTime');
        let statusTime = bodyReader.value('statusTime');
        const userId   = bodyReader.value('users');

        return { id, name, status, updateTime, createTime, statusTime, userId };
    }
}