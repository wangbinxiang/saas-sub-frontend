import Router from 'koa-router';

import {
	showAddOrder,
	addOrder,
	get,
	pay,
    index,
	detail,
	jumpPay
} from '../../controllers/orders';
import { requiresLogin } from '../../middlewares/authorization';


const router = Router();

//路由前缀
router.prefix('/orders');

router.use(requiresLogin);


//添加路由页面
router.get('/add', showAddOrder);

router.post('/', addOrder);


// router.get('/get', get);

// router.get('/pay', pay);

//订单列表页面
router.get('/', index);


router.get('/jumpPay', jumpPay);

//订单详情页面
router.get('/:id', detail);



// router.get('/:id/confirm', confirm);

export default router;