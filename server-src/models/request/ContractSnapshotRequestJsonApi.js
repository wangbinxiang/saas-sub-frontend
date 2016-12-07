import BaseRequest from '../../libs/BaseRequest';
import {
	GET
} from '../../config/httpMethodConf';
import {
	productApiServiceLocation
} from '../../libs/ApiServiceLocation';
import {
	CONTRACT_SNAPSHOT_GET
} from '../../config/apiFeatureConf';
import {
	jsonApiGetUrl
} from '../../libs/helper';

/**
 * 产品json api 请求类
 */
export default class ContractSnapshotRequestJsonApi extends BaseRequest {
	constructor(feature, originData) {
		const host = productApiServiceLocation();
		super(host, feature, originData);
		// this.dataType = 'snapshots';
	}

	/**
	 * 获取合同快照
	 * @author wangbinxiang
	 * @date   2016-09-22T17:31:37+0800
	 * @return {[type]}                 [description]
	 */
	get() {
		let BaseUrl = '/contracts/snapshots';

		let idList = this.originData.idList ? this.originData.idList : '';

		let filters = this.originData.filters ? this.originData.filters : '';

		let pages = this.originData.pages ? this.originData.pages : '';

		this.url = jsonApiGetUrl(BaseUrl, idList, { filters, pages });
		this.method = GET;
	}


	buildFeature() {
		switch (this.feature) {
			case CONTRACT_SNAPSHOT_GET:
				this.get();
				break;
			default:
				throw new Error('Invalid feature method');
		}
	}
}