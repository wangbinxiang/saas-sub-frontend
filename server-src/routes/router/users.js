import Router from 'koa-router';
import { relationship } from '../../controllers/users';
import { requiresLogin } from '../../middlewares/authorization';
import navigation from '../../middlewares/navigation';


const router = Router();

//路由前缀
router.prefix('/users');

router.use(requiresLogin);

router.get('/relationship', navigation, relationship);

export default router;