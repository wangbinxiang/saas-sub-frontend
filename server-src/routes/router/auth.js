import Router from 'koa-router';
import passport from 'koa-passport';
import {
    requiresLogin
} from '../../middlewares/authorization';
import MemberService from '../../models/application/MemberService';
import {
    authRelationshipWechatBlock,
    authNormalWechatBlock
} from '../../middlewares/auth/wechat';
import config from 'config';
import {
    bindCellphone,
    isCellphoneSignup,
    sendBindCellphoneVerificationCode,
    checkBindCellphoneVerificationCode
} from '../../controllers/auth';
import {
    isCellphoneSignupValidation,
    sendSignupCellphoneVerificationCodeValidation,
    bindCellphoneRequestBodyValidation
} from '../../validations/authValidation';
import {
    MEMBER_SOURCE_QIDE
} from '../../config/memberConf';
import base64url from 'base64url';
import { getQuery } from '../../tools/url'


const router = Router();

//绑定手机
router.put('/auth/bind-cellphone', requiresLogin, bindCellphoneRequestBodyValidation,  checkBindCellphoneVerificationCode, bindCellphone);


//发送手机验证码
router.get('/auth/validate/send-bind-cellphone-verification-code', sendSignupCellphoneVerificationCodeValidation, sendBindCellphoneVerificationCode);
//检查手机是否注册
router.get('/auth/validate/is-cellphone-signup', isCellphoneSignupValidation, isCellphoneSignup);


const normalCallback = function(ctx, next) {
    return async function(profile, info, status) {
        console.log('status');
        console.log(status);
        console.log(profile);
        if (profile === false) {
            ctx.status = 403;
            ctx.body = info;
        } else {
            const unionId = profile.unionid;
            const openid = profile.openid;
            const nickName = profile.nickname;
            const shopId = ctx._subId;
            const memberService = new MemberService();
            const member = await memberService.wechatLogin(openid, nickName, shopId, unionId);
            console.log('member');
            console.log(member);
            if (member) {
                //如果member没有头像，上传微信头像


                ctx.login(member);
                // ctx.status = 200;
                // ctx.body = member;

                let redirectTo = ctx.query.returnTo ? base64url.decode(ctx.query.returnTo) : '/';

                ctx.redirect(redirectTo);
            } else {
                ctx.status = 403;
                ctx.body = {};
            }
        }
    }
}

router.get('/wechat-pc/auth/callback', authNormalWechatBlock, async(ctx, next) => {
    try {
        await passport.authenticate('wechatPc',  normalCallback(ctx, next))(ctx, next);
    } catch (err) {
        console.log(err);
        ctx.redirect('/');
    }
});


router.get('/wechat/auth/callback', authNormalWechatBlock, async(ctx, next) => {
    try {
        await passport.authenticate('wechat', normalCallback(ctx, next))(ctx, next);
    } catch (err) {
        console.log(err);
        ctx.redirect('/');
    }
});

const relationshipCallback = function(ctx, next) {
    return async function(profile, info, status) {
        console.log('status');
        console.log(status);
        console.log(profile);
        if (profile === false) {
            ctx.status = 403;
            ctx.body = info;
        } else {
            const unionId = profile.unionid;
            const parentId = ctx.query.parentId;
            const openid = profile.openid;
            const nickName = profile.nickname;
            // const unionId = 'otuttxMhJwPxPnCbLQ2MaHAanmrg'
            // const parentId = 1
            // const openid = 'ob5uxwZjH81AEeiVutEGnR2hU-W1'
            // const nickName = '波风皆人'
            const shopId = ctx._subId;
            const memberService = new MemberService();

            let loginResult;

            const returnTo = ctx.query.returnTo ? base64url.decode(ctx.query.returnTo): null;
            console.log(returnTo);
            let returnToQuery
            if (returnTo) {
                returnToQuery = getQuery(returnTo);
            }
            console.log(returnToQuery);
            //如果是启德链接
            //如果有ctx.query.returnTo, 并有from和sourceId
            //
            if (ctx._subId === '10021' && returnToQuery && returnToQuery.from == 'qd' && returnToQuery.sourceId) {
                loginResult = await memberService.wechatRelationshipSourceLogin(openid, nickName, shopId, parentId, unionId, MEMBER_SOURCE_QIDE, returnToQuery.sourceId);
                console.log('sourceLogin');
            } else {
                loginResult = await memberService.wechatRelationshipLogin(openid, nickName, shopId, parentId, unionId);
                console.log('login');
            }

            const { member, success } = loginResult

            


            console.log('member');
            console.log(member);
            if (member) {
                //如果member没有头像，上传微信头像



                ctx.login(member);
                // ctx.status = 200;
                // ctx.body = member;

                let redirectTo = returnTo ? returnTo : '/';

                console.log('redirectTo:' + redirectTo);

                ctx.redirect(redirectTo);

                // if (parentId === config.get('relationshipParentId')) {
                //     ctx.redirect(redirectTo);
                // } else {
                //     const title = '关联用户注册'
                //         //页面提示信息
                //     let message;
                //     if (success) {
                //         message = '您关联用户成功，当前已登录。'
                //     } else {
                //         message = '您之前已注册过，关联用户失败，当前已登录。'
                //     }

                //     await ctx.render('auth/relationship', {
                //         title,
                //         success,
                //         message,
                //         redirectTo
                //     });
                // }
            } else {
                ctx.status = 403;
                ctx.body = {};
            }
        }
    }
}   

router.get('/wechat-pc/auth/relationship/callback', authRelationshipWechatBlock, async(ctx, next) => {
    try {
        await passport.authenticate('wechatPc',  relationshipCallback(ctx, next))(ctx, next);
    } catch (err) {
        console.log(err);
        ctx.redirect('/');
    }
});


router.get('/wechat/auth/relationship/callback', authRelationshipWechatBlock, async(ctx, next) => {
    try {
        await passport.authenticate('wechat', relationshipCallback(ctx, next))(ctx, next);
    } catch (err) {
        console.log(err);
        ctx.redirect('/');
    }
});

//退出登录
// router.get('signout', async (ctx, next) => {

// });

// router.post('/custom', async (ctx, next) => {
//     return passport.authenticate('local', function(user, info, status) {
//         if (user === false) {
//             ctx.status = 401;
//             ctx.body = { success: false };
//         } else {
//             ctx.body = { success: true };
//             return ctx.login(user);
//         }
//     })(ctx, next);
// });
export default router;