import OrderService from '../models/application/OrderService';

export async function showAddOrder(ctx, next) {
	//商品id  ctx.query.id
	//商品价格索引 ctx.query.price
	//商品数量 ctx.query.number
	let productId = ctx.query.id;
	let priceOrder = ctx.query.price;
	let productNum = ctx.query.number;

	console.log(productId);
	console.log(priceOrder);
	console.log(productNum);

	const orderService = new OrderService();

	let result = await orderService.showAddOrder(productId, priceOrder, productNum);

	if (result !== null) {

		let { product, priceInfo, totalPrice } = result;

		const title = '订单详情';
	    const pageJs = webpackIsomorphicTools.assets().javascript.order;
	    const data = {
	        goods: [{
	            "id": 123,
	            "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
	            "sku": 'red',
	            "price": 25670,
	            "quantity": 1230
	        }, {
	            "id": 124,
	            "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
	            "sku": 'red',
	            "price": 25671,
	            "quantity": 1231
	        }, {
	            "id": 125,
	            "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
	            "sku": 'red',
	            "price": 25672,
	            "quantity": 1232
	        }],
	        addresses: [{
	            "id": 123,
	            "name": "Mi id sollicitudin",
	            "mobile": "15098765432",
	            "where": "山西-西安-莲湖区",
	            "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
	        }, {
	            "id": 124,
	            "name": "Mi jd sollicitudin",
	            "mobile": "15098765432",
	            "where": "山西-西安-莲区",
	            "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
	        }, {
	            "id": 125,
	            "name": "Mi kd sollicitudin",
	            "mobile": "15098765432",
	            "where": "山西-西安-湖区",
	            "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
	        }, ],
	        totalGoods: 1256,
	        deliveryFee: 100,
	        step: 1
	    };
	    await ctx.render('index/order', {
	        title,
	        pageJs,
	        data
	    });
	} else {
		ctx.status = 404
        await ctx.render('404');
	}
} 