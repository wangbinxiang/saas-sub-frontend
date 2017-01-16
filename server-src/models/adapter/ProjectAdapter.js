import RequestAdapter from '../../libs/RequestAdapter';
import ProjectTranslator from '../translator/ProjectTranslator';
import ProjectRequestJsonApi from '../request/ProjectRequestJsonApi';
import {
	PROJECT_GET,
	PROJECT_ADD,
	PROJECT_EDIT,
	PROJECT_PRICE_ADD,
	PROJECT_DEL,
	PROJECT_PUBLISH,
	PROJECT_REVERT
} from '../../config/apiFeatureConf';
import pageCLass from '../model/page';
/**
 * 产品适配器
 */
export default class ProjectAdapter extends RequestAdapter {
	constructor() {
		super();
		this.translator = new ProjectTranslator();
	}

	buildRequest(apiFeature, data) {
		this.requestObject = new ProjectRequestJsonApi(apiFeature, data);
	}


	get({
		idList,
		filters,
		pages,
		sort
	}, aProjectClass) {
		this.buildRequest(PROJECT_GET, {
			idList,
			filters,
			pages,
			sort
		});

		//如果idList是数组 则需要数组形式的结果
		this.needArrayResult(idList)

		this.translator.pageClass = pageCLass;

		this.activeClass = aProjectClass;

		return this.request();
	}

	add({
		projectType,
		userId,
		name,
		feature,
		category,
		description,
		slides,
		keywordIds
	}, aProjectClass) {
		this.buildRequest(PROJECT_ADD, {
			projectType,
			userId,
			name,
			feature,
			category,
			description,
			slides,
			keywordIds
		});

		this.activeClass = aProjectClass;

		return this.request();

	}

	edit({
		projectType,
		id,
		name,
		feature,
		description,
		slides,
		keywordIds
	}, aProjectClass) {
		this.buildRequest(PROJECT_EDIT, {
			projectType,
			id,
			name,
			feature,
			description,
			slides,
			keywordIds
		});

		this.activeClass = aProjectClass;

		return this.request();
	}

	del({
		id
	}, aProjectClass) {
		this.buildRequest(PROJECT_DEL, {
			id
		});

		this.activeClass = aProjectClass;

		return this.request();
	}

	addPrices({
		id,
		prices
	}, aProjectClass) {
		this.buildRequest(PROJECT_PRICE_ADD, {
			id,
			prices
		});

		this.activeClass = aProjectClass;

		return this.request();

	}

	publish({
		id
	}, aProjectClass) {
		this.buildRequest(PROJECT_PUBLISH, {
			id
		});

		this.activeClass = aProjectClass;

		return this.request();
	}

	revert({
		id
	}, aProjectClass) {
		this.buildRequest(PROJECT_REVERT, {
			id
		});

		this.activeClass = aProjectClass;

		return this.request();
	}
}