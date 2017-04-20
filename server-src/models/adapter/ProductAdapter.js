import RequestAdapter from '../../libs/RequestAdapter';
import ProductTranslator from '../translator/ProductTranslator';
import ProductRequestJsonApi from '../request/ProductRequestJsonApi';
import {
	PRODUCT_GET,
	PRODUCT_ADD,
	PRODUCT_EDIT,
	PRODUCT_DEL,
	PRODUCT_PRICE_ADD
} from '../../config/apiFeatureConf';
import pageCLass from '../model/page';
/**
 * 产品适配器
 */
export default class ProductAdapter extends RequestAdapter {
	constructor() {
		super();
		this.translator = new ProductTranslator();
	}

	buildRequest(apiFeature, data) {
		this.requestObject = new ProductRequestJsonApi(apiFeature, data);
	}


	get({
		idList,
		filters,
		pages,
		sort,
		include
	}, aProductClass) {
		this.buildRequest(PRODUCT_GET, {
			idList,
			filters,
			pages,
			sort,
			include
		});

		//如果idList是数组 则需要数组形式的结果
		this.needArrayResult(idList)

		this.translator.pageClass = pageCLass;

		this.activeClass = aProductClass;

		return this.request();
	}

	add({
		userId,
		name,
		feature,
		productType,
		description,
		slides
	}, aProductClass) {
		this.buildRequest(PRODUCT_ADD, {
			userId,
			name,
			feature,
			productType,
			description,
			slides
		});

		this.activeClass = aProductClass;

		return this.request();

	}

	edit({
		id,
		name,
		feature,
		productType,
		description,
		slides
	}, aProductClass) {
		this.buildRequest(PRODUCT_EDIT, {
			id,
			name,
			feature,
			productType,
			description,
			slides
		});

		this.activeClass = aProductClass;

		return this.request();
	}

	del({
		id
	}, aProductClass) {
		this.buildRequest(PRODUCT_DEL, {
			id
		});

		this.activeClass = aProductClass;

		return this.request();
	}

	addPrices({
		id,
		prices
	}, aProductClass) {
		this.buildRequest(PRODUCT_PRICE_ADD, {
			id,
			prices
		});

		this.activeClass = aProductClass;

		return this.request();

	}
}