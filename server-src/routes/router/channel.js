import Router from 'koa-router';
import { productType, category } from '../../controllers/channel';
import navigation from '../../middlewares/navigation';
const router = Router();
import { requiresLogin } from '../../middlewares/authorization';

//路由前缀
router.prefix('/channel');

//需要登陆
router.use(requiresLogin);

router.get('/productTypes/:id', navigation, productType);

router.get('/categories/:id', navigation, category);


export default router;