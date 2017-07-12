import Router from 'koa-router'
import {
  index,
  add,
  edit,
  del
} from '../../controllers/deliveryInformations'
import {
  inWechatRequiresLogin
} from '../../middlewares/authorization'

const router = Router()

// 需要登陆
router.use(inWechatRequiresLogin)

// 路由前缀
router.prefix('/delivery-informations')

// 地址列表
router.get('/', index)
//
router.post('/', add)
//
router.put('/:id', edit)
//
router.del('/', del)
export default router
