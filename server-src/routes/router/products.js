import Router from 'koa-router'
import {
  detail
} from '../../controllers/products'
import {
  detailValidation
} from '../../validations/productsValidation'
import navigation from '../../middlewares/navigation'
import {
  inWechatRequiresLogin
} from '../../middlewares/authorization'
import {
  permission
} from '../../middlewares/permission/'

const router = Router()

// 需要登陆
router.use(inWechatRequiresLogin)

router.use(permission)

// 路由前缀
router.prefix('/products')

// 预览产品页面
router.get('/:id', detailValidation, navigation, detail)

router.get('/:id/:source', detailValidation, navigation, detail)

export default router
