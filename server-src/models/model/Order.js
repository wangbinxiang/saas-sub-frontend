export default class Order {
	constructor({
		id = 0,
		status = 0,
		payType = 1,
		userId = 0,
		shopId = 0,
		price = 0,
		comment = '',
		productList = {}
	}) {
		this.id = id;
		this.payType = payType;
		this.userId = userId;
		this.shopId = shopId;
		this.price = price;
		this.comment = comment;
		this.productList = productList;
	}
}