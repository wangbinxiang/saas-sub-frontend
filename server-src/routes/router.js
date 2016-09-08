import Router from 'koa-router';

//主页路由
import indexRouter from './router/index';
import RouterAuth from './router/auth'


const router = new Router();

router.use('', indexRouter.routes());
router.use('', RouterAuth.routes());

export default router;