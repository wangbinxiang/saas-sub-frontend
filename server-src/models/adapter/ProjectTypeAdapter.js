import RequestAdapter from '../../libs/RequestAdapter';
import ProjectTypeTranslator from '../translator/ProjectTypeTranslator';
import ProjectTypeRequestJsonApi from '../request/ProjectTypeRequestJsonApi';
import {
	PROJECT_TYPE_GET,
	PROJECT_TYPE_ADD,
	PROJECT_TYPE_EDIT,
	PROJECT_TYPE_DEL
} from '../../config/apiFeatureConf';
import pageCLass from '../model/page';
/**
 * 项目分类适配器
 */
export default class ProjectTypeAdapter extends RequestAdapter {
	constructor() {
		super();
		this.translator = new ProjectTypeTranslator();
	}

	buildRequest(apiFeature, data) {
		this.requestObject = new ProjectTypeRequestJsonApi(apiFeature, data);
	}


	get({
		idList,
		filters,
		pages,
		sort
	}, aProjectTypeClass) {
		this.buildRequest(PROJECT_TYPE_GET, {
			idList,
			filters,
			pages,
			sort
		});

		//如果idList是数组 则需要数组形式的结果
		this.needArrayResult(idList)

		this.translator.pageClass = pageCLass;

		this.activeClass = aProjectTypeClass;

		return this.request();
	}

	add({
		userId,
		name,
		category
	}, aProjectTypeClass) {
		this.buildRequest(PROJECT_TYPE_ADD, {
			userId,
			name,
			category
		});

		this.activeClass = aProjectTypeClass;

		return this.request();

	}

	edit({
		id,
		name,
		category
	}, aProjectTypeClass) {
		this.buildRequest(PROJECT_TYPE_EDIT, {
			id,
			name,
			category
		});

		this.activeClass = aProjectTypeClass;

		return this.request();
	}

	del({
		id
	}, aProjectTypeClass) {
		this.buildRequest(PROJECT_TYPE_DEL, {
			id
		});

		this.activeClass = aProjectTypeClass;

		return this.request();
	}
}