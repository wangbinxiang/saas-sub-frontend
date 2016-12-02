import Router from 'koa-router';
import { productType, category } from '../../controllers/channel';
import navigation from '../../middlewares/navigation';
const router = Router();

//路由前缀
router.prefix('/channel');




router.get('/productTypes/:id', navigation, productType);

router.get('/categories/:id', navigation, category);


export default router;