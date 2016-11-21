import Router from 'koa-router';
import { productType } from '../../controllers/channel';
import navigation from '../../middlewares/navigation';
const router = Router();

//路由前缀
router.prefix('/channel');




router.get('/:id', navigation, productType);


export default router;