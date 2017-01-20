import BaseRequest from '../../libs/BaseRequest';
import {
	GET,
	POST,
	PUT,
	DELETE
} from '../../config/httpMethodConf';
import {
	productApiServiceLocation
} from '../../libs/ApiServiceLocation';
import {
	PRODUCT_GET,
	PRODUCT_ADD,
	PRODUCT_EDIT,
	PRODUCT_DEL,
	PRODUCT_PRICE_ADD
} from '../../config/apiFeatureConf';
import {
	jsonApiGetUrl
} from '../../libs/helper';

/**
 * 产品json api 请求类
 */
export default class ProductRequestJsonApi extends BaseRequest {
	constructor(feature, originData) {
		const host = productApiServiceLocation();
		super(host, feature, originData);
		this.dataType = 'products';
	}

	/**
	 * 获取产品
	 * @author wangbinxiang
	 * @date   2016-09-22T17:31:37+0800
	 * @return {[type]}                 [description]
	 */
	get() {
		let BaseUrl = '/products';

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
		this.dataType = 'commonProducts';

		let url = '/products';

		this.url = url;

		this.method = POST;

		this.setSuccessCode(201);

		let attributes = {
			userId: this.originData.userId,
			name: this.originData.name,
			feature: this.originData.feature,
			productType: this.originData.productType,
			description: this.originData.description,
			slides: this.originData.slides
		};

		this.buildData(attributes);
	}

	/**
	 *  编辑产品
	 * @date   2016-09-20T16:37:01+0800
	 * @return {[type]}                 [description]
	 */
	edit() {
		this.dataType = 'commonProducts';


		let url = '/products/';
		let id = this.originData.id;

		this.url = url + id;
		this.method = PUT;

		let attributes = {
			name: this.originData.name,
			feature: this.originData.feature,
			productType: this.originData.productType,
			description: this.originData.description,
			slides: this.originData.slides
		};

		this.buildData(attributes);
	}


	/**
	 * 删除分类请求
	 * @author wangbinxiang
	 * @date   2016-09-20T16:54:42+0800
	 * @return {[type]}                 [description]
	 */
	delete() {
		let url = '/products/';
		let id = this.originData.id;

		this.url = url + id;
		this.method = DELETE;

	}

	/**
	 * 添加产品价格
	 * @author wangbinxiang
	 * @date   2016-09-22T17:28:52+0800
	 */
	addPrices() {

		let id = this.originData.id;

		let url = '/products/' + id + '/prices';

		this.url = url;

		this.method = POST;

		this.setParamsErrorCode(405);

		let attributes = {
			prices: this.originData.prices
		};

		this.buildData(attributes);
	}


	//PRODUCT_GET, PRODUCT_ADD, PRODUCT_EDIT, PRODUCT_DEL, PRODUCT_PRICE_ADD

	buildFeature() {
		switch (this.feature) {
			case PRODUCT_GET:
				this.get();
				break;
			case PRODUCT_ADD:
				this.add();
				break;
			case PRODUCT_EDIT:
				this.edit();
				break;
			case PRODUCT_DEL:
				this.delete();
				break;
			case PRODUCT_PRICE_ADD:
				this.addPrices();
				break;
			default:
				throw new Error('Invalid feature method');
		}
	}
}