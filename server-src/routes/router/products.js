import Router from 'koa-router';
import {
	// index,
	// showAdd,
	// add,
	// showEdit,
	// edit,
	// del,
	detail
	// ,
	// showPrices,
	// prices
} from '../../controllers/products';
import {
	// indexValidation,
	// showAddValidation,
	// addValidation,
	// editParamsValidation,
	// editRequestBodyValidation,
	// delValidation
	// ,
	detailValidation,
	// pricesParamsValidation,
	// pricesRequestBodyValidation
} from '../../validations/productsValidation';
// import { requiresLogin } from '../../middlewares/authorization';

const router = Router();

//需要登陆
// router.use(requiresLogin);

//路由前缀
router.prefix('/products')

//产品列表页面
// router.get('/', indexValidation, index);

//添加产品页面
// router.get('/add', showAddValidation, showAdd);

//发布产品请求
// router.post('/', addValidation, add);


//编辑产品页面
// router.get('/:id/edit', editParamsValidation, showEdit);

//编辑产品请求
// router.put('/:id', editParamsValidation, editRequestBodyValidation, edit);

//删除产品请求
// router.del('/:id', delValidation, del);

//预览产品页面
router.get('/:id', detailValidation, detail);

//添加产品价格页面
// router.get('/:id/prices', pricesParamsValidation, showPrices);

//添加产品价格请求
// router.post('/:id/prices', pricesParamsValidation, pricesRequestBodyValidation, prices);


export default router;