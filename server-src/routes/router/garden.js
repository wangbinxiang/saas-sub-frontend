import Router from 'koa-router';
import { articles, products, projects } from '../../controllers/garden';
import navigation from '../../middlewares/navigation';
const router = Router();
import { inWechatRequiresLogin } from '../../middlewares/authorization';

//路由前缀
router.prefix('/garden');

//需要登陆
router.use(inWechatRequiresLogin);

router.get('/articles', articles);

router.get('/products/:id', products);

router.get('/projects/:id', projects);

export default router;