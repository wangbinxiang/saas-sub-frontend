import OrderService from '../models/application/OrderService';

export async function showAddOrder(ctx, next) {
	//商品id  ctx.query.id
	//商品价格索引 ctx.query.price
	//商品数量 ctx.query.number
	let productId = ctx.query.id;
	let priceOrder = ctx.query.price;
	let productNum = ctx.query.number;


	const orderService = new OrderService();

	let result = await orderService.showAddOrder(productId, priceOrder, productNum);

	if (result !== null) {

		let { product, priceInfo, totalPrice } = result;
		const title = '订单详情';
	    const pageJs = webpackIsomorphicTools.assets().javascript.order;
	    await ctx.render('index/orderConfirm', {
	        title, product, priceInfo, totalPrice, productNum, productId, priceOrder,
	        pageJs
	    });
	} else {
		ctx.status = 404
        await ctx.render('404');
	}
} 




export async function addOrder(ctx, next) {


	// ctx.state.user = { 
	// 	id: '17',
	// 	cellPhone: '',
	// 	nickName: '波风皆人',
	// 	userName: 'GOaC1476033708',
	// 	status: 0,
	// 	createTime: 1476033708,
	// 	updateTime: 1476033708,
	// 	statusTime: 1476033708,
	// 	openId: 'osgj-wm-CKTT4K3xJoBoxh78w73w' }



	// console.log(ctx.state.user);
	let userId = ctx.state.user.id;
	let shopId = 10;

	let price = ctx.request.body.price;

	let comment = ctx.request.body.comment;

	// ctx.request.body.productId;
	// ctx.request.body.number;
	// ctx.request.body.priceIndex;


	const orderService = new OrderService();
	let productList = [
		{
			productId: ctx.request.body.productId,
			number: ctx.request.body.number,
			priceIndex: ctx.request.body.priceIndex
		}
	];
	let result = await orderService.addOrder(userId, shopId, price, comment, productList);

	console.log(result);

	ctx.body = result;
}



export async function get(ctx, next) {


    let number =  1;

    let size =  5; 

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
