import Router from 'koa-router'
// //登陆
import routerAuthenticate from './router/authenticate'
// //产品管理路由
import routerProducts from './router/products'

import routerAttachments from './router/attachments'

// 订单路由
import routerOrders from './router/orders'
// 首页路由
import routerIndex from './router/index'
// 认证路由
import routerAuth from './router/auth'
// 频道页路由
import routerChannel from './router/channel'

import routerQrcode from './router/qrcode'

import routerArticles from './router/articles'

import routerProjects from './router/projects'

import routerApplications from './router/applications'

import routerGarden from './router/garden'

import routerUsers from './router/users'

import routerSearch from './router/search'

import routerDeliveryInformations from './router/deliveryInformations'

const router = new Router()

router.use('', routerAuthenticate.routes())
router.use('', routerProducts.routes())
router.use('', routerOrders.routes())
router.use('', routerAuth.routes())
router.use('', routerIndex.routes())
router.use('', routerChannel.routes())
router.use('', routerQrcode.routes())
router.use('', routerArticles.routes())
router.use('', routerProjects.routes())
router.use('', routerApplications.routes())
router.use('', routerGarden.routes())
router.use('', routerAttachments.routes())
router.use('', routerUsers.routes())
router.use('', routerSearch.routes())
router.use('', routerDeliveryInformations.routes())

export default router
