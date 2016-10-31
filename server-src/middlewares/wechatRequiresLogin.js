/**
 * 微信访问需要登陆
 * @author wangbinxiang
 * @date   2016-09-06T14:10:47+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export default async function wechatRequiresLogin(ctx, next) {

	console.log(ctx.headers['user-agent'])
	console.log(isWeixinBrowser(ctx.headers['user-agent']));

	const ignoreUrls = [
		'/wechat/auth',
		'/wechat/auth/callback'
	];
	console.log(ctx.path);
	console.log(ignoreUrls.indexOf(ctx.path));

	if (isWeixinBrowser(ctx.headers['user-agent']) && ignoreUrls.indexOf(ctx.path) === -1) {
	    if (ctx.isAuthenticated()) {
	        await next();
	    } else {
	        ctx.redirect('/wechat/auth');
	    }
    } else {
    	await next();
    }
}


function isWeixinBrowser(userAgent){
  return /micromessenger/.test(userAgent.toLowerCase());
}