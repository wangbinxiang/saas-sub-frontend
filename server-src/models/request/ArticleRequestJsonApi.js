import BaseRequest from '../../libs/BaseRequest';
import {
	GET,
	POST,
	PUT,
	DELETE
} from '../../config/httpMethodConf';
import {
	cmsApiServiceLocation
} from '../../libs/ApiServiceLocation';
import {
	ARTICLE_GET,
	ARTICLE_ADD,
	ARTICLE_EDIT,
	ARTICLE_DEL,
	ARTICLE_REVERT,
	ARTICLE_PUBLISH
} from '../../config/apiFeatureConf';
import {
	jsonApiGetUrl
} from '../../libs/helper';

/**
 * 产品json api 请求类
 */
export default class ArticleRequestJsonApi extends BaseRequest {
	constructor(feature, originData) {
		const host = cmsApiServiceLocation();
		super(host, feature, originData);
		this.dataType = 'articles';
	}

	/**
	 * 获取文章
	 * @author wangbinxiang
	 * @date   2016-09-22T17:31:37+0800
	 * @return {[type]}                 [description]
	 */
	get() {
		let BaseUrl = '/articles';

		let idList = this.originData.idList ? this.originData.idList : '';

		let filters = this.originData.filters ? this.originData.filters : '';

		let pages = this.originData.pages ? this.originData.pages : '';

		let sort = this.originData.sort ? this.originData.sort : '';

		this.url = jsonApiGetUrl(BaseUrl, idList, { filters, pages, sort });
		this.method = GET;
	}

	/**
	 *  添加文章
	 */
	add() {
		let url = '/articles';

		this.url = url;

		this.method = POST;

		this.setSuccessCode(201);

		let attributes = {
			userId: this.originData.userId,
			title: this.originData.title,
			content: this.originData.content,
			categoryId: this.originData.categoryId
		};

		this.buildData(attributes);
	}

	/**
	 *  编辑文章
	 * @date   2016-09-20T16:37:01+0800
	 * @return {[type]}                 [description]
	 */
	edit() {
		let url = '/articles/';
		let id = this.originData.id;

		this.url = url + id;
		this.method = PUT;

		let attributes = {
			title: this.originData.title,
			content: this.originData.content,
			categoryId: this.originData.categoryId
		};

		this.buildData(attributes);
	}


	/**
	 * 删除文章
	 * @author wangbinxiang
	 * @date   2016-09-20T16:54:42+0800
	 * @return {[type]}                 [description]
	 */
	delete() {
		let url = '/articles/';
		let id = this.originData.id;

		this.url = url + id;
		this.method = DELETE;

	}

	/**
	 * 文章退稿
	 * @author wangbinxiang
	 * @date   2016-12-01T23:25:37+0800
	 * @return {[type]}                 [description]
	 */
	revert() {
		const url = '/articles/' + this.originData.id + '/revert';

		this.url = url;
		
		this.method = PUT;
	}

	/**
	 * 文章发布
	 * @author wangbinxiang
	 * @date   2016-11-15T21:23:01+0800
	 * @return {[type]}                 [description]
	 */
	publish() {
		const url = '/articles/' + this.originData.id + '/publish';

		this.url = url;

		this.method = PUT;
	}


	//PRODUCT_GET, PRODUCT_ADD, PRODUCT_EDIT, PRODUCT_DEL, PRODUCT_PRICE_ADD

	buildFeature() {
		switch (this.feature) {
			case ARTICLE_GET:
				this.get();
				break;
			case ARTICLE_ADD:
				this.add();
				break;
			case ARTICLE_EDIT:
				this.edit();
				break;
			case ARTICLE_REVERT:
				this.revert();
				break;
			case ARTICLE_PUBLISH:
				this.publish();
				break;
			default:
				throw new Error('Invalid feature method');
		}
	}
}