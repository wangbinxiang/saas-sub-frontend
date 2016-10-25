import ShopAdapter from '../adapter/ShopAdapter';
import ProductAdapter from '../adapter/productAdapter';
import Shop from '../model/Shop';
import Product from '../model/Product';

export default class ShopService {
	constructor() {
		this.shopAdapter = new ShopAdapter();
	}

	async get(id) {
		let shop = await this.shopAdapter.get({
			idList: id
		}, Shop);
		if (shop === null) {
			return null;
		} else {
			return shop
		}
	}

	async saveBaseInfo(id, logo, contactPeoplePhone, contactPeopleQQ, copyright) {
		return this.shopAdapter.saveBaseInfo({
			id,
			logo,
			contactPeoplePhone,
			contactPeopleQQ,
			copyright
		}, Shop);
	}

	async saveSlides(id, slides) {
		//查看slides的产品是否是该商铺的
		const productAdapter = await new ProductAdapter();
		let products = await productAdapter.get(slides);
		if (products && Object.keys(products).length === slides.length) {
			for(let product of products) {
				if (product.userId !== id) {
					throw new Error('slides product belong error');
				}
			}
		} else {
			//商品不存在
			throw new Error('slides product not exists error');
		}

		return this.shopAdapter.saveBaseInfo({
			id,
			slides
		}, Shop);
	}
}