import {
	PRODUCT_STATUS_IN_STOCK,
	PRODUCT_STATUS_ON_SALE,
	PRODUCT_STATUS_DELETE,
	PRODUCT_STATUS_PERMANENTLY_DELETE
} from '../../config/productConf';


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
		visible,
		user,
		productType,
		snapshots
	}) {
		this.id            = id;
		this.name          = name;
		this.category      = category;
		this.feature       = feature;
		this.logo          = logo;
		this.minPrice      = minPrice;
		this.maxPrice      = maxPrice;
		this.description   = description;
		this.slides        = slides;
		this.prices        = prices;
		this.updateTime    = updateTime;
		this.createTime    = createTime;
		this.statusTime    = statusTime;
		this.status        = status;
		this.visible       = visible;
		this.userId        = user;
		this.user          = undefined;
		this.productTypeId = productType;
		this.productType   = undefined;
		this.snapshotIds   = snapshots;
	}

	/**
	 * 是否在出售
	 * @author wangbinxiang
	 * @date   2016-11-20T22:26:13+0800
	 * @return {Boolean}                [description]
	 */
	isOnSale() {
		if (this.status === PRODUCT_STATUS_ON_SALE) {
			return true;
		}
		return false;
	}

	/**
	 * 是否拥有该产品
	 * @author wangbinxiang
	 * @date   2016-11-20T22:58:15+0800
	 * @param  {[type]}                 shopId [description]
	 * @return {[type]}                        [description]
	 */
	own(shopId) {
		return this.userId === shopId;
	}

}