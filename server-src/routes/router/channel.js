import Router from 'koa-router'
import {
  productType,
  category,
  projectType,
  articleNavigation,
  projectNavigation
} from '../../controllers/channel'
import navigation from '../../middlewares/navigation'
import {
  inWechatRequiresLogin
} from '../../middlewares/authorization'
import {
  permission
} from '../../middlewares/permission/'

const router = Router()

// 路由前缀
router.prefix('/channel')

// 需要登陆
router.use(inWechatRequiresLogin)

router.use(permission)

router.get('/productTypes/:id', navigation, productType)

router.get('/categories/:id', navigation, category)

router.get('/projectTypes/:id', navigation, projectType)

router.get('/navigation/articles/:id', navigation, articleNavigation)

router.get('/navigation/projects/:id', navigation, projectNavigation)

export default router
