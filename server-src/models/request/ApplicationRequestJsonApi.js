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
	APPLICATION_GET,
	APPLICATION_ADD,
	APPLICATION_FINISH,
	APPLICATION_APPROVE,
	APPLICATION_DECLINE,
	APPLICATION_REPLY,
	APPLICATION_REPLY_GET
} from '../../config/apiFeatureConf';
import {
	jsonApiGetUrl
} from '../../libs/helper';

/**
 * 产品json api 请求类
 */
export default class ApplicationRequestJsonApi extends BaseRequest {
	constructor(feature, originData) {
		const host = projectApiServiceLocation();
		super(host, feature, originData);
		this.dataType = 'applications';
	}

	/**
	 * 获取文章
	 * @author wangbinxiang
	 * @date   2016-09-22T17:31:37+0800
	 * @return {[type]}                 [description]
	 */
	get() {
		let BaseUrl = '/applications';

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
		let url = '/applications';

		this.url = url;

		this.method = POST;

		this.setSuccessCode(201);

		let attributes = {
			realName: this.originData.realName,
			contactPhone: this.originData.contactPhone,
			identifyCardNumber: this.originData.identifyCardNumber,
			companyName: this.originData.companyName,
			companyAddress: this.originData.companyAddress,
			information: this.originData.information,
			priceIndex: this.originData.priceIndex,
			userId: this.originData.userId,
			projectId: this.originData.projectId
		};

		this.buildData(attributes);
	}

	/**
	 * 结束申请
	 * @date   2016-09-20T16:37:01+0800
	 * @return {[type]}                 [description]
	 */
	finish() {

		const url = '/applications/' + this.originData.id + '/finish';

		this.url = url;
		
		this.method = PUT;
	}


	/**
	 * 批准申请
	 * @author wangbinxiang
	 * @date   2016-09-22T17:28:52+0800
	 */
	approve() {

		const url = '/applications/' + this.originData.id + '/approve';

		this.url = url;
		
		this.method = PUT;
	}

	/**
	 * 拒绝申请
	 * @author wangbinxiang
	 * @date   2016-12-01T23:25:37+0800
	 * @return {[type]}                 [description]
	 */
	decline() {
		const url = '/applications/' + this.originData.id + '/decline';

		this.url = url;
		
		this.method = PUT;
	}


	reply() {
		this.dataType = 'replies';

		this.url = '/applications/' + this.originData.id + '/replies'

		this.method = POST;

		this.setSuccessCode(201);

		let attributes = {
			userId: this.originData.userId,
			source: this.originData.source,
			content: this.originData.content
		};

		this.buildData(attributes);
	}

	getReplies() {
		this.dataType = 'replies';

		let BaseUrl = '/application/' + this.originData.id + '/replies'

		let idList = this.originData.idList ? this.originData.idList : '';

		let filters = this.originData.filters ? this.originData.filters : '';

		let pages = this.originData.pages ? this.originData.pages : '';

		let sort = this.originData.sort ? this.originData.sort : '';

		this.url = jsonApiGetUrl(BaseUrl, idList, { filters, pages, sort });
		this.method = GET;
	}


	//PRODUCT_GET, PRODUCT_ADD, PRODUCT_EDIT, PRODUCT_DEL, PRODUCT_PRICE_ADD

	buildFeature() {
		switch (this.feature) {
			case APPLICATION_GET:
				this.get();
				break;
			case APPLICATION_ADD:
				this.add();
				break;
			case APPLICATION_FINISH:
				this.finish();
				break;
			case APPLICATION_APPROVE:
				this.approve();
				break;
			case APPLICATION_DECLINE:
				this.decline();
				break;
			case APPLICATION_REPLY:
				this.reply();
				break;
			case APPLICATION_REPLY_GET:
				this.getReplies();
				break;
			default:
				throw new Error('Invalid feature method');
		}
	}
}