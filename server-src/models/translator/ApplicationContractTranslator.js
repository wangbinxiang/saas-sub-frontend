import Translator from '../../libs/Translator';
import ApplicationJsonApiBodyReader from '../reader/ApplicationJsonApiBodyReader';

export default class ApplicationContractTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {
        const bodyReader = new ApplicationJsonApiBodyReader(data);
        console.log(bodyReader.data)
        const id          = bodyReader.value('id');
        const time        = bodyReader.value('time');
        const address     = bodyReader.value('address');
        const price       = bodyReader.value('price');
        const isOnlinePay = bodyReader.value('isOnlinePay');
        const attachments = bodyReader.value('attachments');
        const updateTime  = bodyReader.value('updateTime');
        const createTime  = bodyReader.value('createTime');


        return {
            id,
            time,
            address,
            price,
            isOnlinePay,
            attachments,
            updateTime,
            createTime,
        };
    }
}