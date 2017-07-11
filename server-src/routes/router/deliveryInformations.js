import Router from 'koa-router'
import {
  index
} from '../../controllers/deliveryInformations'
import navigation from '../../middlewares/navigation'
import {
  inWechatRequiresLogin
} from '../../middlewares/authorization'

const router = Router()

// 需要登陆
router.use(inWechatRequiresLogin)

// 路由前缀
router.prefix('/delivery-informations')

// 预览产品页面
router.get('/', navigation, index)
export default router
