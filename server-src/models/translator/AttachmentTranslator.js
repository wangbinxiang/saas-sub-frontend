import Translator from '../../libs/Translator';
import AttachmentJsonApiBodyReader from '../reader/AttachmentJsonApiBodyReader';

export default class AttachmentTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {
        //读取数据
        const bodyReader = new AttachmentJsonApiBodyReader(data);

        let id  = bodyReader.value('id');
        let url = bodyReader.value('url');

        //返回参数
        return { id, url };
    }
}