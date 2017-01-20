import RequestAdapter from '../../libs/RequestAdapter';
import AccountTranslator from '../translator/AccountTranslator';
import AccountRequestJsonApi from '../request/AccountRequestJsonApi';
import pageCLass from '../model/page';
import {
	ACCOUNT_GET
} from '../../config/apiFeatureConf';


export default class AccountAdapter extends RequestAdapter {
	constructor() {
		super();
		this.translator = new AccountTranslator();
	}

	buildRequest(apiFeature, data) {
		this.requestObject = new AccountRequestJsonApi(apiFeature, data);
	}

	get({
		idList,
		filters,
		pages
	}, aMemberClass) {
		this.buildRequest(ACCOUNT_GET, {
			idList,
			filters,
			pages
		});

		//如果idList是数组 则需要数组形式的结果
		this.needArrayResult(idList)

		this.translator.pageClass = pageCLass;

		this.activeClass = aMemberClass;

		return this.request();
	}
}