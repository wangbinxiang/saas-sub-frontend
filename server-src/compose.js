import compose from 'koa-compose'
import { handlerHostToSubId } from './middlewares/handlerHostToSubId';
import { isInWechat } from './middlewares/wechat';
import { authWechatSign } from './middlewares/auth/wechat';
import router from './routes/router';

export default compose([
	handlerHostToSubId,
	isInWechat,
	authWechatSign,
	router.routes(),
	router.allowedMethods()
])