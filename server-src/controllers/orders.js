import OrderService from '../models/application/OrderService';
import config from 'config';
import nl2br from 'nl2br';

export async function showAddOrder(ctx, next) {
	//商品id  ctx.query.id
	//商品价格索引 ctx.query.price
	//商品数量 ctx.query.number
	const productId = ctx.query.id;
	const priceOrder = ctx.query.price;
	const productNum = ctx.query.number;
	const shopId = ctx._subId;
	const userId = ctx.state.user.id;


	const orderService = new OrderService();

	const result = await orderService.showAddOrder(productId, priceOrder, productNum, shopId, userId);

	if (result !== null) {

		let {
			product,
			priceInfo,
			totalPrice,
			contract,
			account
			} = result;
		const title = '订单详情';
		const pageJs = webpackIsomorphicTools.assets().javascript.order;
		const imgHost = config.get('qiniu.bucket.subImg.url');
		await ctx.render('orders/addOrder', {
			title,
			account,
			product,
			priceInfo,
			totalPrice,
			productNum,
			productId,
			priceOrder,
			pageJs,
			contract,
			nl2br,
			imgHost
		});
	} else {
		ctx.status = 404
		await ctx.render('404');
	}
}



export async function addOrder(ctx, next) {

	let userId = ctx.state.user.id;

	let shopId = ctx._subId;

	let price = ctx.request.body.price;

	let comment = ctx.request.body.comment;

	const orderService = new OrderService();
	let productList = [{
		productId: ctx.request.body.productId,
		number: ctx.request.body.number,
		priceIndex: ctx.request.body.priceIndex
	}];

	let result = await orderService.addOrder(userId, shopId, price, comment, productList);

	if (result === null) {
		ctx.status = 404;
		ctx.body = {};
	} else {

		console.log(result);

		ctx.body = result;
	}
}



export async function get(ctx, next) {


	let number = 1;

	let size = 5;

	let filters = {
		shopId: 10
	};

	let pages = {
		number,
		size
	};


	const orderService = new OrderService();
	let result = await orderService.index(filters, pages);
	// let result = await orderService.get(8);
	console.log(result);
	ctx.body = result;
}


export async function pay(ctx, next) {


	const orderService = new OrderService();
	let result = await orderService.pay(7);

	ctx.body = result;


}

export async function showThirdPay(ctx, next) {
	let userId = ctx.state.user.id;
	// let userId = 21
	let shopId = ctx._subId;
	//订单id
	let id = ctx.params.id;

	const orderService = new OrderService();
	const {
		order,
		account
	} = await orderService.showThirdPay(id, userId, shopId);
	if (order === null) {
		ctx.status = 404;
		await ctx.render('404');
	} else {

		const title = '第三方支付'
		const pageJs = webpackIsomorphicTools.assets().javascript.order;


		await ctx.render('orders/thirdPay', {
			title,
			pageJs,
			order,
			account,
		});
	}
}


export async function thirdPay(ctx, next) {
	let userId = ctx.state.user.id;
	// let userId = 21
	let shopId = ctx._subId;
	//订单id
	let id = ctx.params.id;


	const orderService = new OrderService();
	const order = await orderService.thirdPay(id, userId, shopId);

	if (order === null) {
        throw new Error('thirdPay fail');
    } else {
        ctx.body = order;
    }
}




/**
 * 订单列表
 * @author wangbinxiang
 * @date   2016-10-26T13:31:07+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function index(ctx, next) {

	let userId = ctx.state.user.id;

	let shopId = ctx._subId;

	let number = ctx.query.number ? ctx.query.number : 1;

	let size = ctx.query.size ? ctx.query.size : 10;

	let filters = {
		userId,
		shopId
	};

	let pages = {
		number,
		size
	};

	let orders = null;
	let isNext = false;


	const orderService = new OrderService();
	let result = await orderService.search(filters, pages);

	if (result !== null) {
		let page = result.page;
		orders = result.orders;

		if (page && page.haveNext()) {
			isNext = true;
		}


	}

	if (ctx.accepts('html', 'text', 'json') === 'json') {
		ctx.body = {
			orders,
			isNext
		};

	} else {
		const title = '订单管理'
		const pageJs = webpackIsomorphicTools.assets().javascript.order;

		let pageNo = 1
		await ctx.render('orders/index', {
			title,
			pageJs,
			orders,
			isNext,
			pageNo,
			number,
			size
		});
	}
}

/**
 * 订单详情
 * @author wangbinxiang
 * @date   2016-10-30T13:02:52+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function detail(ctx, next) {

	let userId = ctx.state.user.id;
	// let userId = 21
	let shopId = ctx._subId;
	//订单id
	let id = ctx.params.id;

	const orderService = new OrderService();
	const {
		order,
		account
	} = await orderService.detail(id, userId, shopId);
	if (order === null) {
		ctx.status = 404;
		await ctx.render('404');
	} else {

		const title = '订单详情'
		const pageJs = webpackIsomorphicTools.assets().javascript.order;

		const hubHost = config.get('host.hub');
		const imgHost = config.get('qiniu.bucket.subImg.url');

		await ctx.render('orders/detail', {
			title,
			pageJs,
			order,
			account,
			hubHost,
			imgHost,
			nl2br
		});
	}
}

export async function confirm(ctx, next) {

	let id = ctx.params.id;

	const orderService = new OrderService();
	let order = await orderService.confirmPay(id);

	ctx.body = order;
}


export async function jumpPay(ctx, next) {
	let id = ctx.query.id;

	let redirect = 'http://' + config.get('host.hub') + '/wechat/pay/?id=' + id;

	ctx.redirect(redirect);

}