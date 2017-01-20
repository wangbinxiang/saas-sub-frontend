import Translator from '../../libs/Translator';
import ShopJsonApiBodyReader from '../reader/ShopJsonApiBodyReader';

export default class ShopTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {
        const bodyReader = new ShopJsonApiBodyReader(data);

		const id                 = bodyReader.value('id');
		const title              = bodyReader.value('title');
		const contactPeople      = bodyReader.value('contactPeople');
		const contactPeoplePhone = bodyReader.value('contactPeoplePhone');
		const contactPeopleQQ    = bodyReader.value('contactPeopleQQ');
		const logo               = bodyReader.value('logo');
		const officialQRCode     = bodyReader.value('officialQRCode');
		const copyright          = bodyReader.value('copyright');
		const province           = bodyReader.value('province');
		const city               = bodyReader.value('city');
		const address            = bodyReader.value('address');
		const customerService    = bodyReader.value('customerService');
		const aboutInfo          = bodyReader.value('aboutInfo');
		const slides             = bodyReader.value('slides');
		const navigation         = bodyReader.value('navigation');
		const createTime         = bodyReader.value('createTime');
		const updateTime         = bodyReader.value('updateTime');
		const statusTime         = bodyReader.value('statusTime');
		const status             = bodyReader.value('status');

        return { id, title, contactPeople, contactPeoplePhone, contactPeopleQQ, logo, officialQRCode, copyright, province, city, address, customerService, aboutInfo, slides, navigation, createTime, updateTime, statusTime, status};
    }
}