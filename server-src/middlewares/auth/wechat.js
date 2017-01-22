import { AUTH_WECHAT_NORMAL_LINK, AUTH_WECHAT_RELATIONSHIP_LINK } from '../../config/authConf';
import { isAuthRelationship, isAuthNormal } from '../../tools/auth';
import { inWehcat, notInWechat } from '../../tools/wechat';

//关系型注册屏蔽掉其他注册方式的站点
//需要来自微信端
export async function authRelationshipWechatBlock(ctx, next) {
	if (isAuthRelationship(ctx)) {
		await next();
	} else {
		ctx.status = 404;
		await ctx.render('404');
	}

	//扫码注册关联相关用户
	

	//点击注册关联相关用户
}

//普通注册屏蔽掉非其他注册方式的站点
//需要来自微信端
export async function authNormalWechatBlock(ctx, next) {
	if (isAuthNormal(ctx)) {
		await next();
	} else {
		ctx.status = 404;
		await ctx.render('404');
	}
}

/**
 * 微信端，注册登陆标记
 * @author wangbinxiang
 * @date   2016-11-19T13:41:58+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function authWechatSign(ctx, next) {
	if (ctx.isUnauthenticated()) {
		if (isAuthRelationship(ctx)) {
			ctx.state.__AUTH_WECHAT_LINK__ = AUTH_WECHAT_RELATIONSHIP_LINK;
		} else if (isAuthNormal(ctx)) {
			ctx.state.__AUTH_WECHAT_LINK__ = AUTH_WECHAT_NORMAL_LINK;
		}

	}
	await next();
}


//如果是微信端
//未登录
//则标记 是关联型注册还是普通注册

//未登录时，检查是否是微信端，显示一键授权登录
//普通的，显示普通登陆的。
//需要关联人的 显示关联人登陆。
//
//显示
//
//
//



//微信端
//大美不自动注册登陆
//
//其他网站自动注册登陆？