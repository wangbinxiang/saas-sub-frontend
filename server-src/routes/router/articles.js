import Router from 'koa-router';
import {
	detail
} from '../../controllers/articles';
import {
	detailValidation,
} from '../../validations/productsValidation';
import navigation from '../../middlewares/navigation';
import { inWechatRequiresLogin } from '../../middlewares/authorization';

const router = Router();

//路由前缀
router.prefix('/articles')

//需要登陆
router.use(inWechatRequiresLogin);


//预览产品页面
router.get('/:id', detailValidation, navigation, detail);


export default router;