import ProductSnapshotAdapter from '../adapter/ProductSnapshotAdapter';
import ProductSnapshot from '../model/ProductSnapshot';

export default class ProductSnapshotService {
	constructor() {
		this.productSnapshotAdapter = new ProductSnapshotAdapter();
	}

	async get(id) {
		let order = await this.productSnapshotAdapter.get({
			idList: id
		}, Order);

		return order;
	}
}