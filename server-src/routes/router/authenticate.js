import Router from 'koa-router';
import passport from 'koa-passport';
import {
	login,
	logout,
	faker
} from '../../controllers/authenticate';
import { requiresLogin } from '../../middlewares/authorization';
import { wechatRelationshipValidation } from '../../validations/authValidation';
import { signupRelationshipBlock, signupNormalBlock } from '../../middlewares/auth/signup';

import config from 'config';

import OAuth from 'wechat-oauth';
import base64url from 'base64url';


const router = Router();


router.get('/auth/faker', async (ctx, next) => {
	ctx.request.body.passport = '123';
	ctx.request.body.password = '123';

	await next();
}, faker);

router.get('/wechat/auth', signupNormalBlock, async (ctx, next) => {

	let callbackUrl = 'http://' + config.get('wechat.dianshangwan.authHost') + '/wechat/auth/callback?';

	let redirectTo = 'http://' + ctx.host + '/wechat/auth/callback';

	if (ctx.session.returnTo) {
		redirectTo += '?&returnTo=' + ctx.session.returnTo;
	}

	callbackUrl += 'redirectTo=' +base64url(redirectTo);

	console.log(callbackUrl);
	const oauth = new OAuth(config.get('wechat.dianshangwan.appID'), config.get('wechat.dianshangwan.appsecret'));
	let location = oauth.getAuthorizeURL(callbackUrl, '123', 'snsapi_userinfo');
	ctx.redirect(location);
});

//关联用户注册
router.get('/wechat/auth/relationship', signupRelationshipBlock, wechatRelationshipValidation, async (ctx, next) => {
	const parentId = ctx.query.parentId;


	let callbackUrl = 'http://' + config.get('wechat.dianshangwan.authHost') + '/wechat/auth/callback?';

	let redirectTo = 'http://' + ctx.host + '/wechat/auth/relationship/callback?parentId=' + parentId;

	if (ctx.query.redirectTo) {
		redirectTo += '&returnTo=' + ctx.query.redirectTo;
	}

	callbackUrl += 'redirectTo=' +base64url(redirectTo);

	console.log(callbackUrl);
	const oauth = new OAuth(config.get('wechat.dianshangwan.appID'), config.get('wechat.dianshangwan.appsecret'));
	let location = oauth.getAuthorizeURL(callbackUrl, '123', 'snsapi_userinfo');
	ctx.redirect(location);
});

//大美网站直接注册登陆
router.get('/wechat/auth/login/relationship', signupRelationshipBlock, async (ctx, next) => {

	let callbackUrl = 'http://' + config.get('wechat.dianshangwan.authHost') + '/wechat/auth/callback?';

	let redirectTo = 'http://' + ctx.host + '/wechat/auth/login/relationship/callback';

	if (ctx.query.redirectTo) {
		redirectTo += '?returnTo=' + ctx.query.redirectTo;
	}

	callbackUrl += 'redirectTo=' +base64url(redirectTo);

	console.log(callbackUrl);
	const oauth = new OAuth(config.get('wechat.dianshangwan.appID'), config.get('wechat.dianshangwan.appsecret'));
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