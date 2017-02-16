import base64url from 'base64url';
import { inWehcat } from '../tools/wechat';
import { addQuery, queryNotMatch, removeQuery } from '../tools/url';
import { isAuthRelationship } from '../tools/auth';
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
    		redirectUrl = inWechatRedirect(ctx)
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
                redirectUrl = inWechatRedirect(ctx)
	    	}
	        ctx.redirect(redirectUrl);
	    }
    } else {
    	await next();
    }
}


function inWechatRedirect(ctx) {
    let redirectUrl = '/';
    //__p__是新标示，p是老标示
    if (((ctx.query.__p__ && ctx.query.__p__ > 0) || (ctx.query.p && ctx.query.p > 0)) && isAuthRelationship(ctx)) {
        //parentId在query里的key
        const parentIdFlag = ctx.query.__p__ > 0 ?'__p__': 'p'

        const parentQuery = { parentId: ctx.query[parentIdFlag], returnTo: base64url(removeQuery(ctx.url, [parentIdFlag])) };
        redirectUrl = addQuery(ctx.state.__AUTH_WECHAT_LINK__, parentQuery);
    } else {
        redirectUrl = ctx.state.__AUTH_WECHAT_LINK__ + '?returnTo=' + base64url(ctx.url);
    }

    return redirectUrl
}