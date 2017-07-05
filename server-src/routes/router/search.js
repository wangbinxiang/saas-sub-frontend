import Router from 'koa-router'
import {
  products
} from '../../controllers/search'
import navigation from '../../middlewares/navigation'
import {
  inWechatRequiresLogin
} from '../../middlewares/authorization'

const router = Router()

// 需要登陆
router.use(inWechatRequiresLogin)

// 路由前缀
router.prefix('/search')

// 预览产品页面
router.get('/', navigation, products)

export default router
