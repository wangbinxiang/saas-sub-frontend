import ApplicationJsonApiBodyReader from '../reader/ApplicationJsonApiBodyReader';
import Translator from '../../libs/Translator';

export default class InformationTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {
        const bodyReader = new ApplicationJsonApiBodyReader(data);

        let id                    = bodyReader.id;
        let title                 = bodyReader.value('title');
        let contactPeople         = bodyReader.value('contactPeople');
        let contactPeopleQQ       = bodyReader.value('contactPeopleQQ');
        let contactPeoplePhone    = bodyReader.value('contactPeoplePhone');
        let province              = bodyReader.value('province');
        let city                  = bodyReader.value('city');
        let address               = bodyReader.value('address');
        let bankCardHolderName    = bodyReader.value('bankCardHolderName');
        let bankCardNumber        = bodyReader.value('bankCardNumber');
        let bankCardCellphone     = bodyReader.value('bankCardCellphone');
        let category              = bodyReader.value('category');
        let type                  = bodyReader.value('type');
        let updateTime            = bodyReader.value('updateTime');
        let createTime            = bodyReader.value('createTime');
        let statusTime            = bodyReader.value('statusTime');
        let status                = bodyReader.value('status');
        let additionalInformation = bodyReader.value('additionalInformation');


        return { id, title, contactPeople, contactPeoplePhone, contactPeopleQQ, province, city, address, identifyCardFrontPhoto, identifyCardBackPhoto, bankCardHolderName, bankCardNumber, bankCardCellphone, additionalInformation };

    }
}