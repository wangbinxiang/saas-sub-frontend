import Router from 'koa-router';
import {
	inWechatRequiresLogin
} from '../../middlewares/authorization';
import {
	index,
	search,
	// showAdd,
	// add,
	// showEdit,
	// edit,
	// del,
	// showPrices,
	// prices,
	// publish,
	// revert,
	detail
} from '../../controllers/projects';


const router = Router();

//需要登陆
router.use(inWechatRequiresLogin);

//路由前缀
router.prefix('/projects');


//订单列表页面
// router.get('/', index);

// router.get('/search', search);

// router.get('/add', showAdd);

// router.post('/', add);

// router.get('/:id/edit', showEdit);

// router.put('/:id', edit);

// //添加项目价格页面
// router.get('/:id/prices', showPrices);

// //添加项目价格请求
// router.post('/:id/prices', prices);


// //项目发布
// router.put('/:id/publish', publish);

// //项目撤销
// router.put('/:id/revert', revert);

//项目预览
router.get('/:id', detail);




export default router;