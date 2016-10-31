import ProductAdapter from '../adapter/ProductAdapter';
import Product from '../model/Product';
import OrderAdapter from '../adapter/OrderAdapter';
import Order from '../model/Order';
import ProductSnapshotAdapter from '../adapter/ProductSnapshotAdapter';
import ProductSnapshot from '../model/ProductSnapshot';


export default class OrderService {

	constructor() {
		this.productAdapter = new ProductAdapter();
		this.orderAdapter = new OrderAdapter();
	}

	async showAddOrder(productId, priceOrder, productNum) {
		//获取产品信息
		let product = await this.productAdapter.get({
			idList: productId
		}, Product);
		if (product === null) {
			return product;
		} else {
			//获取价格信息
			let priceInfo = product.prices[priceOrder];

			//获取总价格
			let totalPrice = priceInfo.price * productNum;

			return {
				product,
				priceInfo,
				totalPrice
			};
		}
	}


	async search(filters, pages) {
		let result = await this.orderAdapter.get({
			filters,
			pages
		}, Order);

		return result;
	}


	async get(id) {
		let order = await this.orderAdapter.get({
			idList: id
		}, Order);

		if (order === null) {
			return null;
		} else {
			let productSnapshot = undefined;
			let snapshotIds = []
			for(let snapshot of order.products) {
				snapshotIds.push(snapshot.snapshot);
			}			

			if (snapshotIds.length) {
				const productSnapshotAdapter = new ProductSnapshotAdapter();
				productSnapshot = await productSnapshotAdapter.get({
					idList: snapshotIds
				}, ProductSnapshot);
			}

			if (productSnapshot) {
				for(let key in order.products) {
					order.products[key]['productSnapshot'] = productSnapshot[order.products[key].snapshot];
				}
			}

			return order;
		}
	}


	async addOrder(userId, shopId, price, comment, productList) {
		return await this.orderAdapter.add({
			userId,
			shopId,
			price,
			comment,
			productList
		}, Order);
	}


	async pay(id) {
		return await this.orderAdapter.pay({ id }, Order);
	}

	async confirmPay(id) {
		return await this.orderAdapter.confirmPay({ id }, Order);	
	}


}