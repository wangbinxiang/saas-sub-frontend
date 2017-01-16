import ProjectTypeAdapter from '../adapter/ProjectTypeAdapter';
import ProjectType from '../model/ProjectType';
import lodash from 'lodash';
import { checkResourcesOwner } from '../../libs/helper';

export default class ProjectTypeService {

	constructor() {
		this.projectTypeAdapter = new ProjectTypeAdapter();
	}

	async index(filters, pages) {
		const sort = '-id';
		let result = await this.projectTypeAdapter.get({
			filters,
			pages,
			sort
		}, ProjectType);

		if (result == null) {
			//没有获取数据 直接返回空
			return result;
		} else {

			const { page, result: projectTypes } = result;

			//返回 分页 和 projectTypes 数据
			return {
				page,
				projectTypes
			};
		}
	}


	async get(idList) {
		const projectTypes = await this.projectTypeAdapter.get({
			idList
		}, ProjectType);

		if (projectTypes === null) {
			return null;
		} else {
			
			return projectTypes;
		}
	}


	add(userId, name, category) {
		return this.projectTypeAdapter.add({
			userId,
			name,
			category
		}, ProjectType);
	}

	async edit(userId, id, name, category) {
		const projectType = await this.projectTypeAdapter.get({
			idList: id
		}, ProjectType);
		console.log(projectType)
		if (projectType === null || !checkResourcesOwner(projectType, 'userId', userId, lodash.isArray(id))) {
			return null;
		} else {
			return await this.projectTypeAdapter.edit({
				id,
				name,
				category
			}, ProjectType);
		}
	}

	del(id) {
		return this.projectTypeAdapter.del({
			id
		}, ProjectType);
	}
}
