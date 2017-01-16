import Translator from '../../libs/Translator';
import ApplicationJsonApiBodyReader from '../reader/ApplicationJsonApiBodyReader';

export default class ApplicationTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {
        const bodyReader = new ApplicationJsonApiBodyReader(data);

        const id                   = bodyReader.value('id');
        const realName             = bodyReader.value('realName');
        const contactPhone         = bodyReader.value('contactPhone');
        const identifyCardNumber   = bodyReader.value('identifyCardNumber');
        const companyName          = bodyReader.value('companyName');
        const companyAddress       = bodyReader.value('companyAddress');
        const information          = bodyReader.value('information');
        const priceIndex           = bodyReader.value('priceIndex');
        const updateTime           = bodyReader.value('updateTime');
        const createTime           = bodyReader.value('createTime');
        const statusTime           = bodyReader.value('statusTime');
        const status               = bodyReader.value('status');
        const userId               = bodyReader.value('members');
        const projectId            = bodyReader.value('projects');
        const contractId           = bodyReader.value('contracts');

        return {
            id,
            realName,
            contactPhone,
            identifyCardNumber,
            companyName,
            companyAddress,
            information,
            priceIndex,
            updateTime,
            createTime,
            statusTime,
            status,
            userId,
            projectId,
            contractId
        };
    }
}