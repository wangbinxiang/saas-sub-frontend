import RequestAdapter from '../../libs/RequestAdapter';
import ShopTranslator from '../translator/ShopTranslator';
import ShopRequestJsonApi from '../request/ShopRequestJsonApi';
import {
	SHOP_GET,
	SHOP_SAVE_NAVIGATION,
	SHOP_SAVE_BASE_INFO,
	SHOP_SAVE_ABOUT_INFO,
	SHOP_SAVE_SLIDES
} from '../../config/apiFeatureConf';
import pageCLass from '../model/page';

export default class ShopAdapter extends RequestAdapter {
	constructor() {
		super();
		this.translator = new ShopTranslator();
	}

	buildRequest(apiFeature, data) {
		this.requestObject = new ShopRequestJsonApi(apiFeature, data);
	}

	get({
		idList,
		filters,
		pages
	}, aShopClass) {
		this.buildRequest(SHOP_GET, {
			idList,
			filters,
			pages
		});

		//如果idList是数组 则需要数组形式的结果
		this.needArrayResult(idList)

		this.translator.pageClass = pageCLass;

		this.activeClass = aShopClass;

		return this.request();
	}


	saveBaseInfo({
		id,
		logo,
		contactPeoplePhone,
		contactPeopleQQ,
		copyright
	}, aShopClass) {
		this.buildRequest(SHOP_SAVE_BASE_INFO, {
			id,
			logo,
			contactPeoplePhone,
			contactPeopleQQ,
			copyright
		});
		this.activeClass = aShopClass;

		return this.request();
	}

	saveAboutInfo() {

	}

	saveNavigation() {

	}

	saveSlides({
		id,
		slides
	}, aShopClass) {
		this.buildRequest(SHOP_SAVE_SLIDES, {
			id,
			slides
		});
		this.activeClass = aShopClass;

		return this.request();
	}
}