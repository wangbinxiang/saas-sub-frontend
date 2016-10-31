import ProductAdapter from '../adapter/ProductAdapter';
import ProductTypeAdapter from '../adapter/ProductTypeAdapter';
import Product from '../model/Product';
import ProductType from '../model/ProductType';
import _ from 'lodash';
import { checkResourcesOwner } from '../../libs/helper';

export default class ProductService {

	constructor() {
		this.productAdapter = new ProductAdapter();
	}

	async index(filters, pages) {
		let result = await this.productAdapter.get({
			filters,
			pages
		}, Product);

		if (result == null) {
			//没有获取数据 直接返回空
			return result;
		} else {

			let { page, result: products } = result;
			

			let productTypeIdList = []
			// let attachmentIdList = [];
			// let logoList = []
			for (let i in products) {
				productTypeIdList.push(products[i].productTypeId);
				// attachmentIdList.push(products[i].logoId);
			}

			//获取productType信息
			if (productTypeIdList && productTypeIdList.length > 0) {
				// try {

				productTypeIdList = _.uniq(productTypeIdList);
				const productTypeAdapter = new ProductTypeAdapter();
				let productTypes = await productTypeAdapter.get({
					'idList': productTypeIdList
				}, ProductType);


				if (productTypes !== null) {
					if (productTypes) {
						for (let i in products) {
							products[i].productType = productTypes[products[i].productTypeId];
						}
					}
				}
			}

			//返回 分页 和 Products 数据
			return {
				page,
				products
			};
		}
	}


	async get(idList, userId) {
		let product = await this.productAdapter.get({
			idList
		}, Product);
		if (product === null || !checkResourcesOwner(product, 'userId', userId, _.isArray(idList))) {
			return product;
		} else {

			let productTypeId = product.productTypeId;

			if (productTypeId) {
				const productTypeAdapter = new ProductTypeAdapter();
				let productType = await productTypeAdapter.get({
					'idList': productTypeId
				}, ProductType);

				if (productType !== null) {
					product.productType = productType;	
				}
			}

			return product;
		}
	}


	add(userId, name, feature, productType, description, slides) {
		return this.productAdapter.add({
			userId,
			name,
			feature,
			productType,
			description,
			slides
		}, Product);
	}

	edit(id, name, feature, productType, description, slides) {
		return this.productAdapter.edit({
			id,
			name,
			feature,
			productType,
			description,
			slides
		}, Product);
	}

	del(id) {
		return this.productAdapter.del({
			id
		}, Product);
	}

	addPrices(id, prices) {
		return this.productAdapter.addPrices({
			id,
			prices
		}, Product);

	}

}