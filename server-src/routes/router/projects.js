import Router from 'koa-router'
import {
  inWechatRequiresLogin
} from '../../middlewares/authorization'
import {
  detail
} from '../../controllers/projects'

import {
  permission
} from '../../middlewares/permission/'

import navigation from '../../middlewares/navigation'

const router = Router()

// 需要登陆
router.use(inWechatRequiresLogin)

router.use(permission)

// 路由前缀
router.prefix('/projects')

// 项目预览
router.get('/:id', navigation, detail)

export default router
