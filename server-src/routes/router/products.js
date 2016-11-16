import Router from 'koa-router';
import {
	detail
} from '../../controllers/products';
import {
	detailValidation,
} from '../../validations/productsValidation';
import navigation from '../../middlewares/navigation';

const router = Router();

//需要登陆
// router.use(requiresLogin);

//路由前缀
router.prefix('/products')


//预览产品页面
router.get('/:id', detailValidation, navigation, detail);


export default router;