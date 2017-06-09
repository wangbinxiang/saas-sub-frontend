import Router from 'koa-router'
import {
	requiresLogin
} from '../../middlewares/authorization'
import {
	index,
	showAdd,
	add,
	finish,
	approve,
	decline,
	detail,
	reply,
	getReplies,
	addContract,
	editContract
} from '../../controllers/applications'

const router = Router()

// 需要登陆
router.use(requiresLogin)

// 路由前缀
router.prefix('/applications')

router.get('/', index)

// 订单列表页面
router.get('/add', showAdd)

router.post('/', add)

router.get('/:id/replies', getReplies)

router.post('/:id/replies', reply)

// router.put('/:id/finish', finish);

router.put('/:id/approve', approve)

router.put('/:id/decline', decline)

// router.post('/:id/contract', addContract)

// router.put('/:id/contract/:contractId', editContract)

// 项目预览
router.get('/:id', detail)

export default router
