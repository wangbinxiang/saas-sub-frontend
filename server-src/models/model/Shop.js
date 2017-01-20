export default class Shop {

	constructor({
		id = 0,
		title,
		contactPeople,
		contactPeoplePhone,
		contactPeopleQQ,
		logo,
		officialQRCode,
		copyright,
		province,
		city,
		address,
		customerService,
		aboutInfo,
		slides,
		navigation,
		createTime,
		updateTime,
		statusTime,
		status
	}) {
		this.id                 = id;
		this.title              = title;
		this.contactPeople      = contactPeople;
		this.contactPeoplePhone = contactPeoplePhone;
		this.contactPeopleQQ    = contactPeopleQQ;
		this.logo               = logo;
		this.officialQRCode		= officialQRCode;
		this.copyright          = copyright;
		this.province           = province;
		this.city               = city;
		this.address            = address;
		this.customerService    = customerService;
		this.aboutInfo          = aboutInfo;
		this.slides             = slides;
		this.navigation         = navigation;
		this.createTime         = createTime;
		this.updateTime         = updateTime;
		this.statusTime         = statusTime;
		this.status             = status;
	}
}

