import Router from 'koa-router';
// //登陆
import routerAuthenticate from './router/authenticate';
// //产品管理路由
import routerProducts from './router/products';

//订单路由
import routerOrders from './router/orders';
//首页路由
import routerIndex from './router/index';
//认证路由
import routerAuth from './router/auth'


const router = new Router();

router.use('', routerAuthenticate.routes());
router.use('', routerProducts.routes());
router.use('', routerOrders.routes());
router.use('', routerAuth.routes());
router.use('', routerIndex.routes());


export default router;