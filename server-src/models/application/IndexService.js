import ProductAdapter from '../adapter/ProductAdapter';
import ProductTypeAdapter from '../adapter/ProductTypeAdapter';
import Product from '../model/Product';
import ProductType from '../model/ProductType';
import _ from 'lodash';
import {
    PRODUCT_STATUS_ON_SALE
} from '../../config/productConf';


export default class IndexService {

	constructor() {
		this.productAdapter = new ProductAdapter();
	}

	async index(number, size, userId) {
		//分页，产品列表，分类列表(导航使用)
		let page, products, productTypes;

		const pages = {
	        number,
	        size
	    };

		const filters = {
			userId,
			status: PRODUCT_STATUS_ON_SALE
		}

		const productsResult = await this.productAdapter.get({
			filters,
			pages
		}, Product);

		if (productsResult !== null) {
			//没有获取数据 直接返回空
			page = productsResult.page;
			products = productsResult.result;
		} 

		//返回 分页 和 Products 数据
		return {
			page,
			products
		};
	}



	async get(id) {
		let product = await this.productAdapter.get({
			idList: id
		}, Product);
		if (product === null) {
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
			//获取产品分类

			//获取图片地址
			//
			//slides 图片

			let attachmentIdList = [];
			attachmentIdList = _.concat(attachmentIdList, product.slideIds);

			//description图片

			if (product.description) {
				for(let des of product.description) {
					if (des.type === 'image' && des.value && des.value.id && parseInt(des.value.id) > 0) {
						attachmentIdList.push(parseInt(des.value.id));
					}
				}
			}

			if (attachmentIdList) {
				attachmentIdList = _.uniq(attachmentIdList);

				const attachmentAdapter = new AttachmentAdapter();
				let attachments = await attachmentAdapter.get(attachmentIdList, Attachment);

				if (attachments !== null) {

					//设置logo图片
					if (attachments[product.logoId]) {
						product.logo = attachments[product.logoId];
					}


					//设置幻灯片图片
					if (product.slideIds) {
						for(let slideId of product.slideIds) {
							product.slides[slideId] = attachments[slideId];
						}
					}


					if (product.description) {
						for(let i in product.description) {
							if (product.description[i].type === 'image' && product.description[i].value && product.description[i].value.id && parseInt(product.description[i].value.id) > 0) {

								product.description[i].value = attachments[product.description[i].value.id];
							}
						}
					}
				}
			}
			return product;
		}
	}
}