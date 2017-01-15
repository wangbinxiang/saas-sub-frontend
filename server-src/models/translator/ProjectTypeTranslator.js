import Translator from '../../libs/Translator';
import ProjectTypeJsonApiBodyReader from '../reader/ProjectTypeJsonApiBodyReader';

export default class ProjectTypeTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {

        const bodyReader = new ProjectTypeJsonApiBodyReader(data);

        const id          = bodyReader.value('id');
        const name        = bodyReader.value('name');
        const category    = bodyReader.value('category');
        const updateTime  = bodyReader.value('updateTime');
        const createTime  = bodyReader.value('createTime');
        const statusTime  = bodyReader.value('statusTime');
        const status      = bodyReader.value('status');
        const userId      = bodyReader.value('saasUsers');


        return {
            id,
            name,
            category,
            updateTime,
            createTime,
            statusTime,
            status,
            userId
        };
    }
}