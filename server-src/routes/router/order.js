import Router from 'koa-router';

import {
	showAddOrder
} from '../../controllers/orders';


const router = Router();

//路由前缀
router.prefix('/orders');


//添加路由页面
router.get('/add', showAddOrder);





export default router;