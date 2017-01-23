import Translator from '../../libs/Translator';
import ArticleJsonApiBodyReader from '../reader/ArticleJsonApiBodyReader';

export default class ArticleTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {

        const bodyReader = new ArticleJsonApiBodyReader(data);

        const id         = bodyReader.value('id');
        const title      = bodyReader.value('title');
        const logo       = bodyReader.value('logo');
        const abstract   = bodyReader.value('abstract');
        const content    = bodyReader.value('content');
        const status     = bodyReader.value('status');
        const updateTime = bodyReader.value('updateTime');
        const createTime = bodyReader.value('createTime');
        const statusTime = bodyReader.value('statusTime');
        const userId     = bodyReader.value('users');
        const categoryId = bodyReader.value('categories');

        return {
            id,
            title,
            logo,
            abstract,
            content,
            status,
            updateTime,
            createTime,
            statusTime,
            userId,
            categoryId
        };
    }
}