import compose from 'koa-compose'
import { handlerHostToSubId } from './middlewares/handlerHostToSubId'
import { isInWechat } from './middlewares/wechat'
import { authWechatSign } from './middlewares/auth/wechat'
import { noCache } from './middlewares/header'
import { jsLocation } from './middlewares/asset'
import { bindRelationship } from './middlewares/relationship'
import router from './routes/router'

import passport from 'koa-passport'
// 注册账号验证规则
import passportRegister from './passport'

passportRegister(passport)

export default compose([
  handlerHostToSubId,
  noCache,
  isInWechat,
  jsLocation,
  passport.initialize(),
  passport.session(),
  authWechatSign,
  bindRelationship,
  router.routes(),
  router.allowedMethods()
])
