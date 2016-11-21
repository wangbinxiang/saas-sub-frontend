import RequestAdapter from '../../libs/RequestAdapter';
import OrderTranslator from '../translator/OrderTranslator';
import OrderRequestJsonApi from '../request/OrderRequestJsonApi';
import pageCLass from '../model/page';
import {
	ORDER_ADD,
	ORDER_PAY,
	ORDER_CONFIRMPAY,
	ORDER_GET
} from '../../config/apiFeatureConf';


export default class OrderAdapter extends RequestAdapter {
		constructor() {
			super();
			this.translator = new OrderTranslator();
		}

		buildRequest(apiFeature, data) {
			this.requestObject = new OrderRequestJsonApi(apiFeature, data);
		}

		get({
			idList,
			filters,
			pages,
			sort
		}, aOrderClass) {
			this.buildRequest(ORDER_GET, {
				idList,
				filters,
				pages,
				sort
			});

			//如果idList是数组 则需要数组形式的结果
			this.needArrayResult(idList)

			this.translator.pageClass = pageCLass;

			this.activeClass = aOrderClass;

			return this.request();
		}


		add({
			userId,
			shopId,
			price,
			comment,
			productList
		}, aOrderClass) {
			this.buildRequest(ORDER_ADD, {
				userId,
				shopId,
				price,
				comment,
				productList
			});

			this.activeClass = aOrderClass;

			return this.request();
		}


		pay({
			id
		}, aOrderClass) {
			this.buildRequest(ORDER_PAY, {
				id
			});

			this.activeClass = aOrderClass;

			return this.request();
		}

		confirmPay({
			id
		}, aOrderClass) {
			this.buildRequest(ORDER_CONFIRMPAY, {
				id
			});

			this.activeClass = aOrderClass;

			return this.request();
		}
}