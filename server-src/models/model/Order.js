import {
	ORDER_STATUS_NAME_LIST	
} from '../../config/orderConf';
import { timestampToDate } from '../../libs/helper';
/**
 * 订单类
 */
export default class Order {
	constructor({
		id,
		price,
		payType,
		category,
		payTime,
		comment,
		freight,
		users,
		shops,
		orderProducts,
		updateTime,
		createTime,
		statusTime,
		status
	}) {
		this.id = id;
		this.price = price;
 		this.payType = payType;
 		this.category = category;
 		this.payTime = payTime;
 		this.comment = comment;
 		this.freight = freight;
		this.userId = users;
		this.shopId = shops;
		this.products = orderProducts;
		this.updateTime = updateTime;
		this.createTime = createTime;
		this.createTimeDate = createTime;
		this.statusTime = statusTime;
		this.status = status;
		this.statusName = status;
	}

	get createTimeDate() {
		return this._createTimeDate;
	}

	set createTimeDate(createTime) {
		this._createTimeDate = timestampToDate(createTime);
	}


	get statusName() {
		return this._statusName;
	}

	set statusName(status) {
		this._statusName = ORDER_STATUS_NAME_LIST[status];
	}


}