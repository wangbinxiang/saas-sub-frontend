import Router from 'koa-router';
import passport from 'koa-passport';
import {
	login,
	logout,
	faker
} from '../../controllers/authenticate';
import { requiresLogin } from '../../middlewares/authorization';
import { wechatRelationshipValidation } from '../../validations/authValidation';
import { authRelationshipWechatBlock, authNormalWechatBlock } from '../../middlewares/auth/wechat';

import config from 'config';

import OAuth from 'wechat-oauth';
import base64url from 'base64url';


const router = Router();


router.get('/auth/faker', async (ctx, next) => {
	ctx.request.body.passport = '123';
	ctx.request.body.password = '123';

	await next();
}, faker);

router.get('/wechat/auth', authNormalWechatBlock, async (ctx, next) => {

	let callbackUrl = 'http://' + config.get('wechat.yundianshang.authHost') + '/wechat/auth/callback?';
	const returnTo = ctx.query.returnTo? ctx.query.returnTo: ( ctx.headers.referer? base64url(ctx.headers.referer): '/');

	let redirectTo = 'http://' + ctx.host + '/wechat/auth/callback?';

	redirectTo += 'returnTo=' + returnTo;
	console.log('redirectTo:' + redirectTo);
	console.log(ctx.headers);
	callbackUrl += 'redirectTo=' + base64url(redirectTo);

	console.log(callbackUrl);
	const oauth = new OAuth(config.get('wechat.yundianshang.appID'), config.get('wechat.yundianshang.appsecret'));
	let location = oauth.getAuthorizeURL(callbackUrl, '123', 'snsapi_userinfo');
	ctx.redirect(location);
});

//关联用户注册
router.get('/wechat/auth/relationship', authRelationshipWechatBlock, async (ctx, next) => {
	const parentId = ctx.query.parentId? ctx.query.parentId: config.get('relationshipParentId');
	const returnTo = ctx.query.returnTo? ctx.query.returnTo: ( ctx.headers.referer? base64url(ctx.headers.referer): '/');

	let callbackUrl = 'http://' + config.get('wechat.yundianshang.authHost') + '/wechat/auth/callback?';

	let redirectTo = 'http://' + ctx.host + '/wechat/auth/relationship/callback?parentId=' + parentId;

	redirectTo += '&returnTo=' + returnTo;
	console.log('redirectTo:' + redirectTo);
	callbackUrl += 'redirectTo=' + base64url(redirectTo);

	console.log(callbackUrl);
	const oauth = new OAuth(config.get('wechat.yundianshang.appID'), config.get('wechat.yundianshang.appsecret'));
	let location = oauth.getAuthorizeURL(callbackUrl, '123', 'snsapi_userinfo');
	ctx.redirect(location);
});

router.get('/log', async (ctx, next) => {
	console.log(ctx.query.code);
	console.log(ctx.query.sub);
	

	ctx.body = { login: 'ok', code: ctx.query.code, sub: ctx.query.sub };
});

// //退出登录
router.get('/logout', logout);

export default router;