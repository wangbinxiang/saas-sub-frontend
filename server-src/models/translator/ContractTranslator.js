import Translator from '../../libs/Translator';
import ArticleJsonApiBodyReader from '../reader/ContractJsonApiBodyReader';

export default class ContractTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {

        const bodyReader = new ArticleJsonApiBodyReader(data);

        const id              = bodyReader.value('id');
        const title           = bodyReader.value('title');
        const content         = bodyReader.value('content');
        const status          = bodyReader.value('status');
        const updateTime      = bodyReader.value('updateTime');
        const createTime      = bodyReader.value('createTime');
        const statusTime      = bodyReader.value('statusTime');
        const userId          = bodyReader.value('users');
        const category        = bodyReader.value('category');

        return {
            id,
            title,
            content,
            status,
            updateTime,
            createTime,
            statusTime,
            userId,
            category
        };
    }
}