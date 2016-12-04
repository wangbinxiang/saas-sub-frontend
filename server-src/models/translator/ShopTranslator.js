import Translator from '../../libs/Translator';
import ShopJsonApiBodyReader from '../reader/ShopJsonApiBodyReader';

export default class ShopTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {
        const bodyReader = new ShopJsonApiBodyReader(data);

		let id                 = bodyReader.value('id');
		let title              = bodyReader.value('title');
		let contactPeople      = bodyReader.value('contactPeople');
		let contactPeoplePhone = bodyReader.value('contactPeoplePhone');
		let contactPeopleQQ    = bodyReader.value('contactPeopleQQ');
		let logo               = bodyReader.value('logo');
		let officialQRCode     = bodyReader.value('officialQRCode');
		let copyright          = bodyReader.value('copyright');
		let province           = bodyReader.value('province');
		let city               = bodyReader.value('city');
		let address            = bodyReader.value('address');
		let aboutInfo          = bodyReader.value('aboutInfo');
		let slides             = bodyReader.value('slides');
		let navigation         = bodyReader.value('navigation');
		let createTime         = bodyReader.value('createTime');
		let updateTime         = bodyReader.value('updateTime');
		let statusTime         = bodyReader.value('statusTime');
		let status             = bodyReader.value('status');

        return { id, title, contactPeople, contactPeoplePhone, contactPeopleQQ, logo, officialQRCode, copyright, province, city, address, aboutInfo, slides, navigation, createTime, updateTime, statusTime, status};
    }
}