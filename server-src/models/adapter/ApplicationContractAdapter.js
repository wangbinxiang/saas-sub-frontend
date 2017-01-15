import RequestAdapter from '../../libs/RequestAdapter';
import ApplicationContractTranslator from '../translator/ApplicationContractTranslator';
import ApplicationContractRequestJsonApi from '../request/ApplicationContractRequestJsonApi';
import {
	APPLICATION_CONTRACT_GET,
	APPLICATION_CONTRACT_ADD,
	APPLICATION_CONTRACT_EDIT
} from '../../config/apiFeatureConf';
import pageCLass from '../model/page';
/**
 * 产品适配器
 */
export default class ApplicationContractAdapter extends RequestAdapter {
	constructor() {
		super();
		this.translator = new ApplicationContractTranslator();
	}

	buildRequest(apiFeature, data) {
		this.requestObject = new ApplicationContractRequestJsonApi(apiFeature, data);
	}


	get({
		idList,
		filters,
		pages,
		sort
	}, aApplicationClass) {
		this.buildRequest(APPLICATION_CONTRACT_GET, {
			idList,
			filters,
			pages,
			sort
		});

		//如果idList是数组 则需要数组形式的结果
		this.needArrayResult(idList)

		this.translator.pageClass = pageCLass;

		this.activeClass = aApplicationClass;

		return this.request();
	}

	add({
		time,
		address,
		price,
		attachments,
		isOnlinePay,
		applicationId
	}, aApplicationContractClass) {
		this.buildRequest(APPLICATION_CONTRACT_ADD, {
			time,
			address,
			price,
			attachments,
			isOnlinePay,
			applicationId
		});

		this.activeClass = aApplicationContractClass;

		return this.request();

	}


	edit({
		id,
		time,
		address,
		price,
		attachments,
		isOnlinePay
	}, aApplicationContractClass) {
		this.buildRequest(APPLICATION_CONTRACT_EDIT, {
			id,
			time,
			address,
			price,
			attachments,
			isOnlinePay
		});

		this.activeClass = aApplicationContractClass;

		return this.request();
	}
}
