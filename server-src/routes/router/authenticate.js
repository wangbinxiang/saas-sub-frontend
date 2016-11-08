import Router from 'koa-router';
import passport from 'koa-passport';
import {
	login,
	logout,
	faker
} from '../../controllers/authenticate';
import { requiresLogin } from '../../middlewares/authorization';
import config from 'config';

import OAuth from 'wechat-oauth';


const router = Router();


// //注册页面
// router.get('/register', showRegister);

// //注册
// router.post('/register', register);

// router.get('/register/verification-code', sendRegisterVerificationCode);

// //登陆页面
// router.get('/login', showLogin);


// //登陆
// router.post('/login', login);


router.get('/auth/faker', async (ctx, next) => {
	ctx.request.body.passport = '123';
	ctx.request.body.password = '123';

	await next();
}, faker);

router.get('/wechat/auth', async (ctx, next) => {

	let callbackUrl = config.get('host.zhuce') + '/wechat/auth/callback?shopId=' + ctx._subId

	if (ctx.session.returnTo) {
		callbackUrl += '&returnTo=' + ctx.session.returnTo;
	}

	// let callbackUrl = 'http://10.sub.dianshangwan.com/wechat/auth/callback';
	const oauth = new OAuth(config.get('wechat.dianshangwan.appID'), config.get('wechat.dianshangwan.appsecret'));
	let location = oauth.getAuthorizeURL(callbackUrl, '123', 'snsapi_userinfo');
	ctx.redirect(location);
});


// router.get('/wechat/zhuce', async (ctx, next) => {
// 	let callbackUrl = 'http://10.sub.dianshangwan.com/wechat/auth/callback';
// 	const oauth = new OAuth(config.get('wechat.dianshangwan.appID'), config.get('wechat.dianshangwan.appsecret'));
// 	let location = oauth.getAuthorizeURL(callbackUrl, '123', 'snsapi_userinfo');
// 	ctx.redirect(location);
// });

router.get('/wechat/zhuce/callback', async (ctx, next) => {
	let code = ctx.query.code;
	if (code) {
		let location = config.get('host.zhuce') + '/wechat/auth/callback?code=' + code;
		ctx.redirect(location);
	} else {
		ctx.status = 404
		await ctx.render('404');
	}
});


router.get('/wechat/faqi/callback', async (ctx, next) => {
	let code = ctx.query.code;
	if (code) {
		let location = config.get('host.zhuce') + '/wechat/faqi/callback?code=' + code;
		ctx.redirect(location);
	} else {
		ctx.status = 404
		await ctx.render('404');
	}
});



router.get('/log', async (ctx, next) => {
	console.log(ctx.query.code);
	console.log(ctx.query.sub);
	

// 	const appId = config.get('wechat.dianshangwan.appID');
// 	const appsecret = config.get('wechat.dianshangwan.appsecret');

// 	//使用code换取access_token
// 	//https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
	
// 	//拉取用户信息
// 	//https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN


// 	ctx.body = { login: 'ok', code: ctx.query.code, sub: ctx.query.sub };
// });

	ctx.body = { login: 'ok', code: ctx.query.code, sub: ctx.query.sub };
});

// //退出登录
// router.get('/logout', logout);

// router.get('/user/change-password', requiresLogin, showUpdatePassword);

// router.post('/user/change-password', requiresLogin, updatePassword);


export default router;