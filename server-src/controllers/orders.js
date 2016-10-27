import OrderService from '../models/application/OrderService';
import ProductService from '../models/application/ProductService';

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
	// let userId = ctx.state.user.id;
	let userId = 21
	let shopId = ctx._subId;

	let price = ctx.request.body.price;

	let comment = ctx.request.body.comment;

	// ctx.request.body.productId;
	// ctx.request.body.number;
	// ctx.request.body.priceIndex;


	const productService = new ProductService();
	let product = await productService.get(ctx.request.body.productId, shopId);
	product.snapshotIds[0];


	if (product === null) {
	    ctx.status = 404;
	    ctx.body = {};
	} else {
		const orderService = new OrderService();
		let productList = [
			{
				productId: ctx.request.body.productId,
				number: ctx.request.body.number,
				priceIndex: ctx.request.body.priceIndex,
				snapshotId: product.snapshotIds[0]
			}
		];
		console.log(productList);
		let result = await orderService.addOrder(userId, shopId, price, comment, productList);

		console.log(result);

		ctx.body = result;
		ctx.status = 500;
		// ctx.body = {};
	}
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


/**
 * 订单列表
 * @author wangbinxiang
 * @date   2016-10-26T13:31:07+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function index(ctx, next) {
    const title = '订单管理'
    const pageJs = webpackIsomorphicTools.assets().javascript.order;
    let data = [
        {id:2233232, status:'等待支付', payment:'微信支付', total:233232, userid:15023568974},
        {id:2233232, status:'已完成', payment:'微信支付', total:233232, userid:15023568974},
        {id:2233232, status:'已完成', payment:'微信支付', total:233232, userid:15023568974}
    ]
    let isNext = true
    let pageNo = 0
    await ctx.render('orders/index', {
        title, pageJs, data, isNext, pageNo
	});
}

export async function detail(ctx, next) {
    const title = '订单管理'
    const pageJs = webpackIsomorphicTools.assets().javascript.order;
    let data = {
        id:212233232,
        status:'等待支付',
        goods:[
            {id:2233232, title:'This is longer content Donec id elit non mi porta gravida at eget metus.', sku:'red', price:233232, qty:3},
                {id:2233233, title:'This is longer content Donec id elit non mi porta gravida at eget metus.', sku:'green', price:233232, qty:3},
                {id:2233234, title:'This is longer content Donec id elit non mi porta gravida at eget metus.', sku:'blue', price:233232, qty:3}
        ],
        comment:'Sapien elit in malesuada semper mi, id sollicitudin urna fermentum.',
        total:2123432
    }
    await ctx.render('orders/detail', {
        title, pageJs, data
	});
}
