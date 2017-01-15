import Translator from '../../libs/Translator';
import ReplyJsonApiBodyReader from '../reader/ReplyJsonApiBodyReader';

export default class ReplyTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {

        const bodyReader = new ReplyJsonApiBodyReader(data);

        const id            = bodyReader.value('id');
        const source        = bodyReader.value('source');
        const content       = bodyReader.value('content');
        const updateTime    = bodyReader.value('updateTime');
        const createTime    = bodyReader.value('createTime');
        const statusTime    = bodyReader.value('statusTime');
        const status        = bodyReader.value('status');
        const userId        = bodyReader.value('users');
        const applicationId = bodyReader.value('applications');


        return {
            id,
            source,
            content,
            updateTime,
            createTime,
            statusTime,
            status,
            userId,
            applicationId
        };
    }
}