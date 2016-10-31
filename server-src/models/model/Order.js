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
		this.statusTime = statusTime;
		this.status = status;
	}
}