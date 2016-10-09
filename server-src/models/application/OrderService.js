import ProductAdapter from '../adapter/ProductAdapter';
import Product from '../model/Product';


export default class OrderService {

	constructor() {
		this.productAdapter = new ProductAdapter();
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

			return { product, priceInfo, totalPrice };
		}
	}


}