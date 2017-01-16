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
	PROJECT_TYPE_GET,
	PROJECT_TYPE_ADD,
	PROJECT_TYPE_EDIT,
	PROJECT_TYPE_DEL
} from '../../config/apiFeatureConf';
import {
	jsonApiGetUrl
} from '../../libs/helper';

/**
 * 项目类型 api 请求类
 */
export default class ProjectTypeRequestJsonApi extends BaseRequest {
	constructor(feature, originData) {
		const host = projectApiServiceLocation();
		super(host, feature, originData);
		this.dataType = 'projectTypes';
	}

	/**
	 * 获取项目类型
	 * @author wangbinxiang
	 * @date   2016-09-22T17:31:37+0800
	 * @return {[type]}                 [description]
	 */
	get() {
		let BaseUrl = '/projectTypes';

		let idList = this.originData.idList ? this.originData.idList : '';

		let filters = this.originData.filters ? this.originData.filters : '';

		let pages = this.originData.pages ? this.originData.pages : '';

		let sort = this.originData.sort ? this.originData.sort : '';

		this.url = jsonApiGetUrl(BaseUrl, idList, { filters, pages, sort });

		this.method = GET;
	}

	/**
	 *  添加项目类型
	 */
	add() {
		let url = '/projectTypes';

		this.url = url;

		this.method = POST;

		this.setSuccessCode(201);

		let attributes = {
			name: this.originData.name,
			userId: this.originData.userId,
			category: this.originData.category,
		};

		this.buildData(attributes);
	}

	/**
	 *  编辑项目类型
	 * @date   2016-09-20T16:37:01+0800
	 * @return {[type]}                 [description]
	 */
	edit() {
		let url = '/projectTypes/';
		let id = this.originData.id;

		this.url = url + id;
		this.method = PUT;

		let attributes = {
			name: this.originData.name,
			category: this.originData.category
		};

		this.buildData(attributes);
	}


	/**
	 * 删除项目类型
	 * @author wangbinxiang
	 * @date   2016-09-20T16:54:42+0800
	 * @return {[type]}                 [description]
	 */
	delete() {
		let url = '/projectTypes/';
		let id = this.originData.id;

		this.url = url + id;
		this.method = DELETE;

	}

	buildFeature() {
		switch (this.feature) {
			case PROJECT_TYPE_GET:
				this.get();
				break;
			case PROJECT_TYPE_ADD:
				this.add();
				break;
			case PROJECT_TYPE_EDIT:
				this.edit();
				break;
			case PROJECT_TYPE_DEL:
				this.delete();
				break;
			default:
				throw new Error('Invalid feature method');
		}
	}
}