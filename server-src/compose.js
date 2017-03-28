import compose from 'koa-compose'
import { handlerHostToSubId } from './middlewares/handlerHostToSubId'
import { isInWechat } from './middlewares/wechat'
import { authWechatSign } from './middlewares/auth/wechat'
import { noCache } from './middlewares/header'
import { jsLocation } from './middlewares/asset'
import router from './routes/router'

export default compose([
	handlerHostToSubId,
	noCache,
	isInWechat,
	authWechatSign,
	jsLocation,
	router.routes(),
	router.allowedMethods()
])