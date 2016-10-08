import Router from 'koa-router';

//主页路由
import routerIndex from './router/index';
//登陆
import routerAuthenticate from './router/authenticate';
//产品管理路由
import routerProducts from './router/products';
//产品分类路由
import routerProductTypes from './router/productTypes';
//上传附件路由
import routerAttachments from './router/attachments';


const router = new Router();

router.use('', routerIndex.routes());
// router.use('', routerAuthenticate.routes());
// router.use('', routerProducts.routes());
// router.use('', routerProductTypes.routes());
// router.use('', routerAttachments.routes());

export default router;