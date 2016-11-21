import ProductTypeAdapter from '../adapter/ProductTypeAdapter';
import ProductType from '../model/ProductType';

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

}