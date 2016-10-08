export default class Product {
	constructor ({
		id = 0,
		name,
		category,
		feature,
		logo,
		minPrice,
		maxPrice,
		description,
		slides,
		prices,
		updateTime,
		createTime,
		statusTime,
		status,
		user,
		productType
	}) {
		this.id            = id;
		this.name          = name;
		this.category      = category;
		this.feature       = feature;
		this.logo          = undefined;
		this.logoId        = logo;
		this.minPrice      = minPrice;
		this.maxPrice      = maxPrice;
		this.description   = description;
		this.slides        = {};
		this.slideIds      = slides;
		this.prices        = prices;
		this.updateTime    = updateTime;
		this.createTime    = createTime;
		this.statusTime    = statusTime;
		this.status        = status;
		this.userId        = user;
		this.user          = undefined;
		this.productTypeId = productType;
		this.productType   = undefined;
	}
}