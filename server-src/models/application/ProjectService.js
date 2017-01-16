import ProjectAdapter from '../adapter/ProjectAdapter';
import Project from '../model/Project';
import lodash from 'lodash';
import { checkResourcesOwner, checkOther } from '../../libs/helper';

export default class ProjectService {

	constructor() {
		this.projectAdapter = new ProjectAdapter();
	}

	async index(filters, pages) {
		const sort = '-id';
		let result = await this.projectAdapter.get({
			filters,
			pages,
			sort
		}, Project);

		if (result == null) {
			//没有获取数据 直接返回空
			return result;
		} else {

			const { page, result: projects } = result;
			

			// let productTypeIdList = []
			// for (let i in products) {
			// 	productTypeIdList.push(products[i].productTypeId);
			// }

			// //获取productType信息
			// if (productTypeIdList && productTypeIdList.length > 0) {
			// 	// try {

			// 	productTypeIdList = lodash.uniq(productTypeIdList);
			// 	const productTypeAdapter = new ProductTypeAdapter();
			// 	let productTypes = await productTypeAdapter.get({
			// 		'idList': productTypeIdList
			// 	}, ProductType);


			// 	if (productTypes !== null) {
			// 		if (productTypes) {
			// 			for (let i in products) {

			// 				const productTypeKey = lodash.findIndex(productTypes, function(o) { return o.id === products[i].productTypeId; });

							
			// 				products[i].productType = productTypes[productTypeKey];
			// 			}
			// 		}
			// 	}
			// }

			//返回 分页 和 Products 数据
			return {
				page,
				projects
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
		const project = await this.projectAdapter.get({
			idList
		}, Project);

		if (project === null) {
			return null;
		} else {

			// let productTypeId = product.productTypeId;

			// if (productTypeId) {
			// 	const productTypeAdapter = new ProductTypeAdapter();
			// 	let productType = await productTypeAdapter.get({
			// 		'idList': productTypeId
			// 	}, ProductType);

			// 	if (productType !== null) {
			// 		product.productType = productType;	
			// 	}
			// }
			return project;
		}
	}


	async detail(id, userId, category) {
		const project = await this.projectAdapter.get({
			idList: id
		}, Project);

		if (project === null || !checkResourcesOwner(project, 'category', category, lodash.isArray(id)) || !checkResourcesOwner(project, 'userId', userId, lodash.isArray(id))) {
			return null;
		} else {

			return project;
		}
	}


	add(userId, name, feature, category, projectType, description, slides, keywordIds = []) {
		return this.projectAdapter.add({
			projectType,
			userId,
			name,
			feature,
			category,
			description,
			slides,
			keywordIds
		}, Project);
	}

	async edit(userId, id, name, feature, projectType, description, slides, keywordIds = []) {
		const project = await this.projectAdapter.get({
			idList: id
		}, Project);
		console.log(project)
		if (project === null || !checkResourcesOwner(project, 'userId', userId, lodash.isArray(id))) {
			return null;
		} else {
			return await this.projectAdapter.edit({
				projectType,
				id,
				name,
				feature,
				description,
				slides,
				keywordIds
			}, Project);
		}
	}

	del(id) {
		return this.projectAdapter.del({
			id
		}, Project);
	}

	addPrices(id, prices) {
		return this.projectAdapter.addPrices({
			id,
			prices
		}, Project);
	}

	async publish(id) {
		const result = await this.projectAdapter.publish({
			id
		}, Project);

		if (result) {
			return result;
		}
		return null
	}

	async revert(id) {
		const result = await this.projectAdapter.revert({
			id
		}, Project);

		if (result) {
			return result;
		}
		return null
	}

}
