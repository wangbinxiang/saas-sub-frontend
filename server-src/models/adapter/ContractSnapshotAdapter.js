import RequestAdapter from '../../libs/RequestAdapter';
import ContractSnapshotTranslator from '../translator/ContractSnapshotTranslator';
import ContractSnapshotRequestJsonApi from '../request/ContractSnapshotRequestJsonApi';
import pageCLass from '../model/page';
import {
	CONTRACT_SNAPSHOT_GET
} from '../../config/apiFeatureConf';


export default class ContractSnapshotAdapter extends RequestAdapter {
		constructor() {
			super();
			this.translator = new ContractSnapshotTranslator();
		}

		buildRequest(apiFeature, data) {
			this.requestObject = new ContractSnapshotRequestJsonApi(apiFeature, data);
		}

		get({
			idList,
			filters,
			pages
		}, aContractSnapshotClass) {
			this.buildRequest(CONTRACT_SNAPSHOT_GET, {
				idList,
				filters,
				pages
			});

			//如果idList是数组 则需要数组形式的结果
			this.needArrayResult(idList)

			this.translator.pageClass = pageCLass;

			this.activeClass = aContractSnapshotClass;

			return this.request();
		}
}