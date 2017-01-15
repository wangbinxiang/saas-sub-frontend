import BaseRequest from '../../libs/BaseRequest';
import {
	GET,
	POST,
	PUT,
	DELETE
} from '../../config/httpMethodConf';
import {
	projectApiServiceLocation
} from '../../libs/ApiServiceLocation';
import {
	PROJECT_GET,
	PROJECT_ADD,
	PROJECT_EDIT,
	PROJECT_PRICE_ADD,
	PROJECT_DEL,
	PROJECT_PUBLISH,
	PROJECT_REVERT
} from '../../config/apiFeatureConf';
import {
	jsonApiGetUrl
} from '../../libs/helper';

/**
 * 产品json api 请求类
 */
export default class ProjectRequestJsonApi extends BaseRequest {
	constructor(feature, originData) {
		const host = projectApiServiceLocation();
		super(host, feature, originData);
		this.dataType = 'projects';
	}

	/**
	 * 获取文章
	 * @author wangbinxiang
	 * @date   2016-09-22T17:31:37+0800
	 * @return {[type]}                 [description]
	 */
	get() {
		let BaseUrl = '/projects';

		let idList = this.originData.idList ? this.originData.idList : '';

		let filters = this.originData.filters ? this.originData.filters : '';

		let pages = this.originData.pages ? this.originData.pages : '';

		let sort = this.originData.sort ? this.originData.sort : '';

		this.url = jsonApiGetUrl(BaseUrl, idList, { filters, pages, sort });
		this.method = GET;
	}

	/**
	 *  添加项目
	 */
	add() {
		let url = '/projects';

		this.url = url;

		this.method = POST;

		this.setSuccessCode(201);

		let attributes = {
			projectType: this.originData.projectType,
			userId: this.originData.userId,
			name: this.originData.name,
			feature: this.originData.feature,
			category: this.originData.category,
			description: this.originData.description,
			slides: this.originData.slides,
			keywordIds: this.originData.keywordIds
		};

		this.buildData(attributes);
	}

	/**
	 *  编辑项目
	 * @date   2016-09-20T16:37:01+0800
	 * @return {[type]}                 [description]
	 */
	edit() {
		let url = '/projects/';
		let id = this.originData.id;

		this.url = url + id;
		this.method = PUT;

		let attributes = {
			projectType: this.originData.projectType,
			name: this.originData.name,
			feature: this.originData.feature,
			description: this.originData.description,
			slides: this.originData.slides,
			keywordIds: this.originData.keywordIds
		};

		this.buildData(attributes);
	}


	/**
	 * 添加项目价格
	 * @author wangbinxiang
	 * @date   2016-09-22T17:28:52+0800
	 */
	addPrices() {

		let id = this.originData.id;

		let url = '/projects/' + id + '/prices';

		this.url = url;

		this.method = POST;

		this.setParamsErrorCode(405);

		let attributes = {
			prices: this.originData.prices
		};

		this.buildData(attributes);
	}


	/**
	 * 删除项目
	 * @author wangbinxiang
	 * @date   2016-09-20T16:54:42+0800
	 * @return {[type]}                 [description]
	 */
	delete() {
		let url = '/projects/';
		let id = this.originData.id;

		this.url = url + id;
		this.method = DELETE;

	}

	/**
	 * 项目发布
	 * @author wangbinxiang
	 * @date   2016-11-15T21:23:01+0800
	 * @return {[type]}                 [description]
	 */
	publish() {
		const url = '/projects/' + this.originData.id + '/publish';

		this.url = url;

		this.method = PUT;
	}


	/**
	 * 项目撤销
	 * @author wangbinxiang
	 * @date   2016-12-01T23:25:37+0800
	 * @return {[type]}                 [description]
	 */
	revert() {
		const url = '/projects/' + this.originData.id + '/revert';

		this.url = url;
		
		this.method = PUT;
	}

	


	//PRODUCT_GET, PRODUCT_ADD, PRODUCT_EDIT, PRODUCT_DEL, PRODUCT_PRICE_ADD

	buildFeature() {
		switch (this.feature) {
			case PROJECT_GET:
				this.get();
				break;
			case PROJECT_ADD:
				this.add();
				break;
			case PROJECT_EDIT:
				this.edit();
				break;
			case PROJECT_PRICE_ADD:
				this.addPrices();
				break;
			case PROJECT_PUBLISH:
				this.publish();
				break;
			case PROJECT_REVERT:
				this.revert();
				break;
			case PROJECT_DEL:
				this.delete();
				break;
			default:
				throw new Error('Invalid feature method');
		}
	}
}