import Router from 'koa-router';

import {
	showAddOrder,
	showMulitAddOrder,
	addOrder,
	get,
	showThirdPay,
	thirdPay,
	offlinePay,
    index,
	detail,
	jumpPay
} from '../../controllers/orders';
import { requiresLogin } from '../../middlewares/authorization';
import navigation from '../../middlewares/navigation';


const router = Router();

//路由前缀
router.prefix('/orders');

router.use(requiresLogin);

router.post('/new', async(ctx, next) => {
	console.log(ctx.method === 'POST')
	console.log(ctx.request.body.productOrder)

	await next()

}, showMulitAddOrder)


//添加路由页面
router.get('/add', navigation, showAddOrder);

router.post('/', addOrder);


// router.get('/get', get);

router.get('/:id/third-pay', showThirdPay);

router.put('/:id/third-pay', thirdPay);

router.put('/:id/offline-pay', offlinePay);

//订单列表页面
router.get('/', navigation, index);


router.get('/jumpPay', jumpPay);

//订单详情页面
router.get('/:id', navigation, detail);



// router.get('/:id/confirm', confirm);

export default router;