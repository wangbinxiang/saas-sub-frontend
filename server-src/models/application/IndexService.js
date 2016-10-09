import ProductAdapter from '../adapter/ProductAdapter';
import ProductTypeAdapter from '../adapter/ProductTypeAdapter';
import AttachmentAdapter from '../adapter/AttachmentAdapter';
import Product from '../model/Product';
import ProductType from '../model/ProductType';
import Attachment from '../model/Attachment';
import _ from 'lodash';


export default class IndexService {

	constructor() {
		this.productAdapter = new ProductAdapter();
	}

	async index(filters, pages, logoWidth, logoHeight) {
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
			let attachmentIdList = [];
			let logoList = []
			for (let i in products) {
				productTypeIdList.push(products[i].productTypeId);
				attachmentIdList.push(products[i].logoId);
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

			//获取封面图片信息
			if (attachmentIdList && attachmentIdList.length > 0) {
				attachmentIdList = _.uniq(attachmentIdList);
				const attachmentAdapter = new AttachmentAdapter();
				let attachments = await attachmentAdapter.getImage(attachmentIdList, logoWidth, logoHeight, Attachment);

				if (attachments !== null) {
					for (let i in products) {
						products[i].logo = attachments[products[i].logoId];
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