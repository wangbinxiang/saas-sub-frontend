import Router from 'koa-router';
import { articles, products, projects } from '../../controllers/garden';
import navigation from '../../middlewares/navigation';
const router = Router();
import { inWechatRequiresLogin } from '../../middlewares/authorization';

//路由前缀
router.prefix('/garden');

//需要登陆
router.use(inWechatRequiresLogin);

router.get('/articles', navigation, articles);

router.get('/products/:id', navigation, products);

router.get('/projects/:id', navigation, projects);

export default router;