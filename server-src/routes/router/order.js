import Router from 'koa-router';

import {
	showAddOrder,
	addOrder,
	get,
	pay
} from '../../controllers/orders';


const router = Router();

//路由前缀
router.prefix('/orders');


//添加路由页面
router.get('/add', showAddOrder);

router.post('/', addOrder);


router.get('/get', get);

// router.get('/pay', pay);



export default router;