import ProductTypeAdapter from '../adapter/ProductTypeAdapter';
import ProductType from '../model/ProductType';
import CategoryAdapter from '../adapter/CategoryAdapter';
import Category from '../model/Category';

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
}