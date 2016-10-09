import Router from 'koa-router';
import { index, add, edit, del } from '../../controllers/productTypes';
import { indexValidation, addValidation, editParamsValidation, editRequestBodyValidation, delValidation } from '../../validations/productTypesValidation';
import { requiresLogin } from '../../middlewares/authorization';

const router = Router();


//需要登陆
router.use(requiresLogin);

//路由前缀
router.prefix('/product-types');


//分类列表页面
router.get('/', indexValidation, index);


//添加产品请求
router.post('/', addValidation, add);

//编辑产品请求
router.put('/:id', editParamsValidation, editRequestBodyValidation, edit);


//删除产品请求
router.del('/:id', delValidation, del);


export default router;