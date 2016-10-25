import BaseRequest from '../../libs/BaseRequest';
import {
	GET,
	POST,
	PUT,
	DELETE
} from '../../config/httpMethodConf';
import {
	shopApiServiceLocation
} from '../../libs/ApiServiceLocation';
import {
	jsonApiGetUrl
} from '../../libs/helper';
import {
	SHOP_GET,
	SHOP_SAVE_NAVIGATION,
	SHOP_SAVE_BASE_INFO,
	SHOP_SAVE_ABOUT_INFO,
	SHOP_SAVE_SLIDES
} from '../../config/apiFeatureConf';

export default class ShopRequestJsonApi extends BaseRequest {
	constructor(feature, originData) {
		const host = shopApiServiceLocation();
		super(host, feature, originData);
		this.dataType = 'shops';
	}


	/**
	 * 获取店铺信息
	 * @author wangbinxiang
	 * @date   2016-10-24T18:33:20+0800
	 * @return {[type]}                 [description]
	 */
	get() {
		let BaseUrl = '/shops';

		let idList = this.originData.idList ? this.originData.idList : '';

		let filters = this.originData.filters ? this.originData.filters : '';

		let pages = this.originData.pages ? this.originData.pages : '';

		this.url = jsonApiGetUrl(BaseUrl, idList, { filters, pages });
		this.method = GET;
	}


	/**
	 * 修改店铺信息
	 * @author wangbinxiang
	 * @date   2016-10-24T18:40:33+0800
	 * @return {[type]}                 [description]
	 */
	put() {
		this._putUrl();
		this.method = PUT;
		this._putAttributes();
	}

	// /**
	//  * 修改店铺关于我们信息
	//  * @author wangbinxiang
	//  * @date   2016-10-24T18:41:38+0800
	//  * @return {[type]}                 [description]
	//  */
	// saveAboutInfo() {
	// 	this._putUrl();
	// 	this.method = PUT;
	// 	this._putAttributes();
	// }

	// *
	//  * 修改店铺导航
	//  * @author wangbinxiang
	//  * @date   2016-10-24T18:43:27+0800
	//  * @return {[type]}                 [description]
	 
	// saveNavigation() {
	// 	this._putUrl();
	// 	this.method = PUT;
	// 	this._putAttributes();
	// }


	// /**
	//  * 店铺幻灯片
	//  * @author wangbinxiang
	//  * @date   2016-10-24T18:45:50+0800
	//  * @return {[type]}                 [description]
	//  */
	// saveSlides() {
	// 	this._putUrl();
	// 	this.method = PUT;
	// 	this._putAttributes();
	// }


	buildFeature() {
		switch (this.feature) {
			case SHOP_GET:
				this.get();
				break;
			case SHOP_SAVE_BASE_INFO:
			case SHOP_SAVE_ABOUT_INFO:
			case SHOP_SAVE_NAVIGATION:
			case SHOP_SAVE_SLIDES:
				this.put();
				break;
			default:
				throw new Error('Invalid feature method');
		}
	}

	_putUrl() {
		let url = '/shops/';
		let id = this.originData.id;
		switch (this.feature) {
			case SHOP_SAVE_BASE_INFO:
				this.url = url + id + '/baseInfo';
				break;
			case SHOP_SAVE_ABOUT_INFO:
				this.url = url + id + '/aboutInfo';
				break;
			case SHOP_SAVE_NAVIGATION:
				this.url = url + id + '/navigation';
				break;
			case SHOP_SAVE_SLIDES:
				this.url = url + id + '/slides';
				break;
			default:
				throw new Error('Invalid ShopRequestJsonApi _putUrl PUT feature method');
		}
	}

	_putAttributes() {
		let attributes;
		switch (this.feature) {
			case SHOP_SAVE_BASE_INFO:
				attributes = {
					logo: this.originData.logo,
					contactPeoplePhone: this.originData.contactPeoplePhone,
					contactPeopleQQ: this.originData.contactPeopleQQ,
					copyright: this.originData.copyright
				};
				break;
			case SHOP_SAVE_ABOUT_INFO:
				attributes = {
					aboutInfo: this.originData.aboutInfo
				};
				break;
			case SHOP_SAVE_NAVIGATION:
				attributes = {
					aboutInfo: this.originData.aboutInfo
				};
				break;
			case SHOP_SAVE_SLIDES:
				attributes = {
					slides: this.originData.slides
				};
				break;
			default:
				throw new Error('Invalid ShopRequestJsonApi _putAttributes PUT feature method');
		}
		this.buildData(attributes);
	}
}