import BaseRequest from '../../libs/BaseRequest';
import {
	GET,
	POST,
	PUT,
	DELETE
} from '../../config/httpMethodConf';
import {
	orderApiServiceLocation
} from '../../libs/ApiServiceLocation';
import {
	ORDER_ADD,
	ORDER_PAY,
	ORDER_CONFIRMPAY,
	ORDER_GET
} from '../../config/apiFeatureConf';
import {
	jsonApiGetUrl
} from '../../libs/helper';

/**
 * 产品json api 请求类
 */
export default class OrderRequestJsonApi extends BaseRequest {
	constructor(feature, originData) {
		const host = orderApiServiceLocation();
		super(host, feature, originData);
		this.dataType = 'orders';
	}

	/**
	 * 获取产品
	 * @author wangbinxiang
	 * @date   2016-09-22T17:31:37+0800
	 * @return {[type]}                 [description]
	 */
	get() {
		let BaseUrl = '/orders';

		let idList = this.originData.idList ? this.originData.idList : '';

		let filters = this.originData.filters ? this.originData.filters : '';

		let pages = this.originData.pages ? this.originData.pages : '';

		let sort = this.originData.sort ? this.originData.sort : '';

		this.url = jsonApiGetUrl(BaseUrl, idList, { filters, pages, sort });
		this.method = GET;
	}

	/**
	 *  添加产品
	 */
	add() {
		let url = '/orders';

		this.url = url;

		this.method = POST;

		// this.setSuccessCode(201);

		let attributes = {
			userId: this.originData.userId,
			shopId: this.originData.shopId,
			price: this.originData.price,
			comment: this.originData.comment,
			productList: this.originData.productList
		};

		this.buildData(attributes);
	}

	pay() {
		let url = '/orders/';
		let id = this.originData.id;

		this.url = url + id + '/pay';
		this.method = PUT;

		let attributes = {
			payType: this.originData.payType
		};

		// this.buildData(attributes);
	}

	confirmPay() {
		let url = '/orders/';
		let id = this.originData.id;

		this.url = url + id + '/confirmPay';
		this.method = PUT;

		// let attributes = {
		// 	name: this.originData.name,
		// 	feature: this.originData.feature,
		// 	productType: this.originData.productType,
		// 	description: this.originData.description,
		// 	slides: this.originData.slides
		// };

		// this.buildData(attributes);
	}


	//PRODUCT_GET, PRODUCT_ADD, PRODUCT_EDIT, PRODUCT_DEL, PRODUCT_PRICE_ADD

	buildFeature() {
		switch (this.feature) {
			case ORDER_GET:
				this.get();
				break;
			case ORDER_ADD:
				this.add();
				break;
			case ORDER_PAY:
				this.pay();
				break;
			case ORDER_CONFIRMPAY:
				this.confirmPay();
				break;
			default:
				throw new Error('Invalid feature method');
		}
	}
}