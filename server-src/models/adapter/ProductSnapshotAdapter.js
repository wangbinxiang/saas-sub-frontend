import RequestAdapter from '../../libs/RequestAdapter';
import ProductSnapshotTranslator from '../translator/ProductSnapshotTranslator';
import ProductSnapshotRequestJsonApi from '../request/ProductSnapshotRequestJsonApi';
import pageCLass from '../model/page';
import {
	PRODUCT_SNAPSHOT_GET
} from '../../config/apiFeatureConf';


export default class ProductSnapshotAdapter extends RequestAdapter {
		constructor() {
			super();
			this.translator = new ProductSnapshotTranslator();
		}

		buildRequest(apiFeature, data) {
			this.requestObject = new ProductSnapshotRequestJsonApi(apiFeature, data);
		}

		get({
			idList,
			filters,
			pages,
			include
		}, aProductSnapshotClass) {
			this.buildRequest(PRODUCT_SNAPSHOT_GET, {
				idList,
				filters,
				pages,
				include
			});

			//如果idList是数组 则需要数组形式的结果
			this.needArrayResult(idList)

			this.translator.pageClass = pageCLass;

			this.activeClass = aProductSnapshotClass;

			return this.request();
		}
}