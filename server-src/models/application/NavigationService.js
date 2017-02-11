import ProductTypeAdapter from '../adapter/ProductTypeAdapter';
import ProductType from '../model/ProductType';
import CategoryAdapter from '../adapter/CategoryAdapter';
import Category from '../model/Category';
import ProjectTypeAdapter from '../adapter/ProjectTypeAdapter';
import ProjectType from '../model/ProjectType';
import {
    PROJECT_CATEGORY_B2C
} from '../../config/projectConf';

export default class NavigationService {

	async productTypes(userId) {
		const productTypeAdapter = new ProductTypeAdapter();
		const productTypesResult = await productTypeAdapter.get({
			pages: {
				number: 1,
				size: 20
			},
			filters: {
				userId,
        		status: 0
			}
		}, ProductType);

		if (productTypesResult !== null) {
			return productTypesResult.result;
		} else {
			return null
		}
	}


	async categories(userId) {
		const categoryAdapter = new CategoryAdapter();
		const categoriesResult = await categoryAdapter.get({
			pages: {
				number: 1,
				size: 20
			},
			filters: {
				userId,
        		status: 0
			}
		}, Category);

		if (categoriesResult !== null) {
			return categoriesResult.result;
		} else {
			return null
		}
	}

	async projectTypes(userId) {
		const projectTypeAdapter = new ProjectTypeAdapter()
		const projectTypesResult = await projectTypeAdapter.get({
			pages: {
				number: 1,
				size: 20
			},
			filters: {
				userId,
        		status: 0,
        		category: PROJECT_CATEGORY_B2C
			}
		}, ProjectType);

		if (projectTypesResult !== null) {
			return projectTypesResult.result;
		} else {
			return null
		}
	}
}