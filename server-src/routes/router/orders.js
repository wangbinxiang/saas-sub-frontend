import Router from 'koa-router';
import {
	requiresLogin
} from '../../middlewares/authorization';
import {
	index,
	detail
} from '../../controllers/orders';


const router = Router();

//需要登陆
//router.use(requiresLogin);

//路由前缀
router.prefix('/orders');


//订单列表页面
router.get('/', index);

//订单详情页面
router.get('/detail', detail);


export default router;