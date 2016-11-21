import Router from 'koa-router';
import passport from 'koa-passport';
import MemberService from '../../models/application/MemberService';
import {
    authRelationshipWechatBlock,
    authNormalWechatBlock
} from '../../middlewares/auth/wechat';
import config from 'config';


const router = Router();


router.get('/wechat/auth/callback', authNormalWechatBlock, async(ctx, next) => {
    try {
        await passport.authenticate('wechat', async(profile, info, status) => {
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
                    ctx.login(member);
                    // ctx.status = 200;
                    // ctx.body = member;

                    let redirectTo = ctx.query.returnTo ? ctx.query.returnTo : '/';

                    ctx.redirect(redirectTo);
                } else {
                    ctx.status = 403;
                    ctx.body = {};
                }
            }
        })(ctx, next);
    } catch (err) {
        console.log(err);
        ctx.redirect('/wechat/auth');
    }
});


router.get('/wechat/auth/relationship/callback', authRelationshipWechatBlock, async(ctx, next) => {
    try {
        await passport.authenticate('wechat', async(profile, info, status) => {
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
                const shopId = ctx._subId;
                const memberService = new MemberService();
                const {
                    member,
                    success
                } = await memberService.wechatRelationshipLogin(openid, nickName, shopId, parentId, unionId);
                console.log('member');
                console.log(member);
                if (member) {
                    ctx.login(member);
                    // ctx.status = 200;
                    // ctx.body = member;

                    let redirectTo = ctx.query.returnTo ? ctx.query.returnTo : '/';
                    const title = '关联用户注册'
                        // ctx.redirect(redirectTo);

                    //页面提示信息
                    let message;
                    if (success) {
                        message = '您关联用户成功，当前已登录。'
                    } else {
                        message = '您之前已注册过，关联用户失败，当前已登录。'
                    }

                    await ctx.render('auth/relationship', {
                        title,
                        success,
                        message,
                        redirectTo
                    });
                } else {
                    ctx.status = 403;
                    ctx.body = {};
                }
            }
        })(ctx, next);
    } catch (err) {
        console.log(err);
        ctx.redirect('/wechat/auth');
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