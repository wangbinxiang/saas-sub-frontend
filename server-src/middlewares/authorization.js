import base64url from 'base64url';
import { inWehcat } from '../tools/wechat';
/**
 * 检查是否登陆，没有登陆跳转到/login登录页面
 * @author wangbinxiang
 * @date   2016-09-06T14:10:47+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function requiresLogin(ctx, next) {
    if (ctx.isAuthenticated()) {
        await next();
    } else {
    	let redirectUrl = '/';
    	if (ctx.state.__IN_WECHAT__) {
    		redirectUrl = ctx.state.__AUTH_WECHAT_LINK__ + '?returnTo=' + base64url(ctx.url);
    	}
        ctx.redirect(redirectUrl);
    }
}

export async function inWechatRequiresLogin(ctx, next) {
	if (inWehcat(ctx)) {
	    if (ctx.isAuthenticated()) {
	        await next();
	    } else {
	    	let redirectUrl = '/';
	    	if (ctx.state.__IN_WECHAT__) {
	    		redirectUrl = ctx.state.__AUTH_WECHAT_LINK__ + '?returnTo=' + base64url(ctx.url);
	    	}
	        ctx.redirect(redirectUrl);
	    }
    } else {
    	await next();
    }
}