import ProductAdapter from '../adapter/ProductAdapter';
import Product from '../model/Product';
import OrderAdapter from '../adapter/OrderAdapter';
import Order from '../model/Order';
import ProductSnapshotAdapter from '../adapter/ProductSnapshotAdapter';
import ProductSnapshot from '../model/ProductSnapshot';
import lodash from 'lodash';


export default class OrderService {

	constructor() {
		this.productAdapter = new ProductAdapter();
		this.orderAdapter = new OrderAdapter();
	}

	async showAddOrder(productId, priceOrder, productNum, shopId) {
		//获取产品信息
		let product = await this.productAdapter.get({
			idList: productId
		}, Product);
		if (product === null || !product.isOnSale() || !product.own(shopId)) {
			return null;
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


	/**
	 * 搜索订单
	 * @author wangbinxiang
	 * @date   2016-11-03T14:40:03+0800
	 * @param  {[type]}                 filters [description]
	 * @param  {[type]}                 pages   [description]
	 * @return {[type]}                         [description]
	 */
	async search(filters, pages) {
		const sort = '-id';
		let result = await this.orderAdapter.get({
			filters,
			pages,
			sort
		}, Order);

		if (result === null) {
			return null;
		} else {
			return {
				page: result.page,
				orders: result.result
			};
		}
	}


	async detail(id, userId, shopId) {
		let order = await this.orderAdapter.get({
			idList: id
		}, Order);

		if (order === null || !order.own(userId) || !order.belongShop(shopId)) {
			return null;
		} else {
			let productSnapshot = undefined;
			let snapshotIds = [];
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
					const snapshotKey = lodash.findIndex(productSnapshot, function(o) { return o.id === order.products[key].snapshot; });
					order.products[key]['productSnapshot'] = productSnapshot[snapshotKey];
				}
			}
			return order;
		}
	}


	async addOrder(userId, shopId, price, comment, productList) {
		//获取产品信息
		const product = await this.productAdapter.get({
			idList: productList[0].productId
		}, Product);
		if (product === null || !product.isOnSale() || !product.own(shopId)) {
			return null;
		} else {
			productList[0].snapshotId = product.snapshotIds[0];

			return await this.orderAdapter.add({
				userId,
				shopId,
				price,
				comment,
				productList
			}, Order);
		}
	}


	async pay(id) {
		return await this.orderAdapter.pay({ id }, Order);
	}

	async confirmPay(id) {
		return await this.orderAdapter.confirmPay({ id }, Order);	
	}


}