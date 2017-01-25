import { isWeixinBrowser } from '../tools/wechat';
/**
 * 检查是否微信访问
 * @author wangbinxiang
 * @date   2016-09-06T14:10:47+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function isInWechat(ctx, next) {

	ctx.state.__IN_WECHAT__ = false;

	if (isWeixinBrowser(ctx.headers['user-agent'])) {
		ctx.state.__IN_WECHAT__ = true;
	}

	if (__DEVELOPMENT__) { 
		ctx.state.__IN_WECHAT__ = true;
	}

	await next();
}


