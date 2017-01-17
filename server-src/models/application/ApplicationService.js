import ApplicationAdapter from '../adapter/ApplicationAdapter';
import Application from '../model/Application';
import Reply from '../model/Reply';
import ProjectAdapter from '../adapter/ProjectAdapter';
import Project from '../model/Project';
import ApplicationContractAdapter from '../adapter/ApplicationContractAdapter'
import ApplicationContract from '../model/ApplicationContract'
import {
	REPLY_SOURCE_APPLICATION,
	REPLY_SOURCE_PROJECT
} from '../../config/applicationConf';
import lodash from 'lodash';
import {
	checkResourcesOwner
} from '../../libs/helper';

export default class ApplicationService {

	constructor() {
		this.applicationAdapter = new ApplicationAdapter();
	}

	async index(filters, pages) {
		const sort = '-id';
		let result = await this.applicationAdapter.get({
			filters,
			pages,
			sort
		}, Application);

		if (result == null) {
			//没有获取数据 直接返回空
			return result;
		} else {

			const {
				page,
				result: applications
			} = result;

			//返回 分页 和 Products 数据
			return {
				page,
				applications
			};
		}
	}

	/**
	 * 根据id获取product
	 * @author wangbinxiang
	 * @date   2016-10-26T12:07:37+0800
	 * @param  { int or array[int]}                 idList product.id
	 * @param  {int }                          userId 产品拥有者id,用来验证查询的数据是否是该用户
	 * @return { null or object }              返回空 或者 product
	 */
	async get(idList) {
		const application = await this.applicationAdapter.get({
			idList
		}, Application);

		if (application === null) {
			return null;
		} else {
			return application;
		}
	}

	async detail(id) {
		const application = await this.applicationAdapter.get({
			idList: id
		}, Application);

		if (application === null) {
			return null;
		} else {
			//获取项目信息
			const projectAdapter = new ProjectAdapter();
			const project = await projectAdapter.get({
				idList: application.projectId
			}, Project);
			

			let applicationContract = null;

			//获取合同信息
			if (application.contractId > 0) {
				const applicationContractAdapter = new ApplicationContractAdapter();
				applicationContract = await applicationContractAdapter.get({
					idList: application.contractId
				}, ApplicationContract);
			}

			return {
				application,
				project,
				applicationContract
			}
		}
	}

	async getReplies(id, filters, pages) {
		const sort = '-id';
		let result = await this.applicationAdapter.getReplies({
			id,
			filters,
			pages,
			sort
		}, Reply);

		if (result == null) {
			//没有获取数据 直接返回空
			return result;
		} else {

			const {
				page,
				result: replies
			} = result;

			//返回 分页 和 Products 数据
			return {
				page,
				replies
			};
		}
	}



	add(userId, projectId, realName, contactPhone, identifyCardNumber, companyName, companyAddress, information, priceIndex) {
		return this.applicationAdapter.add({
			userId,
			projectId,
			realName,
			contactPhone,
			identifyCardNumber,
			companyName,
			companyAddress,
			information,
			priceIndex
		}, Application);
	}

	async finish(id) {
		const result = await this.applicationAdapter.finish({
			id
		}, Application);

		if (result) {
			return result;
		}
		return null
	}



	async approve(id) {
		const result = await this.applicationAdapter.approve({
			id
		}, Application);

		if (result) {
			return result;
		}
		return null
	}

	async decline(id) {
		const result = await this.applicationAdapter.decline({
			id
		}, Application);

		if (result) {
			return result;
		}
		return null
	}


	async reply(id, userId, content) {
		const application = await this.applicationAdapter.get({
			idList: id
		}, Application);

		if (application === null) {
			return null;
		} else {
			let source;
			//检查回复来源
			if (application.userId === userId) {
				source = REPLY_SOURCE_APPLICATION
			} else {
				const projectAdapter = new ProjectAdapter();
				const project = await projectAdapter.get({
					idList: application.projectId
				}, Project);

				if (project.userId === userId) {
					source = REPLY_SOURCE_PROJECT
				} else {
					return null;	
				}
			}

			return await this.applicationAdapter.reply({
				id,
				userId,
				source,
				content
			}, Reply);

		}
	}
}