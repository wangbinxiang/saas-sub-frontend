import Router from 'koa-router'
import {
  index,
  add,
  edit,
  del
} from '../../controllers/deliveryInformations'
import {
  indexValidation,
  addValidation,
  editRequestBodyValidation,
  editParamsValidation,
  delParamsValidation
} from '../../validations/deliveryInformationsValidation'
import {
  inWechatRequiresLogin
} from '../../middlewares/authorization'

const router = Router()

// 需要登陆
router.use(inWechatRequiresLogin)

// 路由前缀
router.prefix('/delivery-informations')

// 地址列表
router.get('/', indexValidation, index)
//
router.post('/', addValidation, add)
//
router.put('/:id', editRequestBodyValidation, editParamsValidation, edit)
//
router.del('/', delParamsValidation, del)
export default router
