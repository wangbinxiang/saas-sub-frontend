export default class Shop {

	constructor({
		id = 0,
		title,
		contactPeople,
		contactPeoplePhone,
		contactPeopleQQ,
		logo,
		copyright,
		province,
		city,
		address,
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
		this.copyright          = copyright;
		this.province           = province;
		this.city               = city;
		this.address            = address;
		this.aboutInfo          = aboutInfo;
		this.slides             = slides;
		this.navigation         = navigation;
		this.createTime         = createTime;
		this.updateTime         = updateTime;
		this.statusTime         = statusTime;
		this.status             = status;
	}
}

