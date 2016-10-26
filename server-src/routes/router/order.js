import Router from 'koa-router';

import {
	showAddOrder,
	addOrder,
	get,
	pay,
    index,
	detail
} from '../../controllers/orders';


const router = Router();

//路由前缀
router.prefix('/orders');


//添加路由页面
router.get('/add', showAddOrder);

router.post('/', addOrder);


router.get('/get', get);

// router.get('/pay', pay);

//订单列表页面
router.get('/', index);

//订单详情页面
router.get('/detail', detail);

export default router;