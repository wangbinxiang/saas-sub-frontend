import Router from 'koa-router';
import passport from 'koa-passport';
import {
    showSignUp,
    showSignIn
} from '../../controllers/auth';
import {
    Payment
} from 'wechat-pay';
import fs from 'fs';
import path from 'path';
import ProductService from '../../models/application/ProductService';
import OrderService from '../../models/application/OrderService';
import MemberService from '../../models/application/MemberService';
import {
    signupRelationshipBlock,
    signupNormalBlock
} from '../../middlewares/auth/signup';
import config from 'config';

const p12 = path.resolve(__dirname, '../../../config/apiclient_cert.p12');
const p12File = fs.readFileSync(p12);

var initConfig = {
    partnerKey: "HZ0Y76V68V8WMMW6Q5FLQO7FCSW1KUAY",
    appId: "wx73fc850b69d5209f",
    mchId: "1390442102",
    notifyUrl: "http://10.sub.dianshangwan.com/pay/notify",
    pfx: p12File
};
var payment = new Payment(initConfig);


const router = Router();


// router.get('/pay', async (ctx, next) => {
//     const orderId = ctx.query.id;

//     const orderService = new OrderService();

//     let result = await orderService.get(orderId);

//     if (result) {

//       console.log(result)
//       // const productService = new ProductService();
//       // let product = await productService.get(result.productList.product_id);
//       if (result) {
//         // let openid = ctx.state.user.openId;
//         let openid = 'osgj-wm-CKTT4K3xJoBoxh78w73w';
//         var order = {
//           body: '产品名称',//产品名称
//           attach: '123',//价格名称
//           out_trade_no: 'dsw' + (+new Date),
//           total_fee: 100,//单位为分
//           spbill_create_ip: ctx.ip,
//           openid: openid,
//           trade_type: 'JSAPI'
//         };

//         console.log(order);

//         let payargs = await new Promise((resolve, reject) => {
//             payment.getBrandWCPayRequestParams(order, function(err, payargs){
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(payargs);
//                 }
//             });
//         });

//         console.log(payargs);

//         await ctx.render('pay/index', {
//             payargs,
//             order: result,
//             product
//         });

//       } else {
//         ctx.status = 404
//         await ctx.render('404');
//       }
//     } else {
//       ctx.status = 404
//       await ctx.render('404');
//     }

// });



//注册页面
// router.get('/signup', async (ctx, next) => {
//     console.log(Router.url('signup'));
//     console.log('signStart');
//     await next();
//     console.log('signEnd');
// }, showSignUp);

// //注册
// router.post('/signup', async (ctx, next) => {

// });


// //登陆页面
// router.get('/signin', async (ctx, next) => {
//     console.log(Router.url('signin'));
//     console.log('signStart');
//     await next();
//     console.log('signEnd');
// }, showSignIn);


// //登陆
// router.post('/signin',
//     passport.authenticate('local', {
//       successRedirect: '/',
//       failureRedirect: '/'
//     })
//     // passport.authenticate('local', {
//     //     successRedirect: '/',
//     //     failureRedirect: '/sign/signup'
//     // }), 

// );

router.get('/wechat/auth/callback', signupNormalBlock, async(ctx, next) => {
    try {
        await passport.authenticate('wechat', async(profile, info, status) => {
            console.log('status');
            console.log(status);
            console.log(profile);
            if (profile === false) {
                ctx.status = 403;
                ctx.body = info;
            } else {
                const openid = profile.openid;
                const nickName = profile.nickname;
                const shopId = ctx._subId;
                const memberService = new MemberService();
                const member = await memberService.wechatLogin(openid, nickName, shopId);
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


router.get('/wechat/auth/relationship/callback', signupRelationshipBlock, async(ctx, next) => {
    try {
        await passport.authenticate('wechat', async(profile, info, status) => {
            console.log('status');
            console.log(status);
            console.log(profile);
            if (profile === false) {
                ctx.status = 403;
                ctx.body = info;
            } else {
                const parentId = ctx.query.parentId;
                const openid = profile.openid;
                const nickName = profile.nickname;
                const shopId = ctx._subId;
                const memberService = new MemberService();
                const {
                    member,
                    success
                } = await memberService.wechatRelationshipLogin(openid, nickName, shopId, parentId);
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

//微信直接登录
router.get('/wechat/auth/login/relationship/callback', signupRelationshipBlock, async(ctx, next) => {
    try {
        await passport.authenticate('wechat', async(profile, info, status) => {
            console.log('status');
            console.log(status);
            console.log(profile);
            if (profile === false) {
                ctx.status = 403;
                ctx.body = info;
            } else {
                const parentId = config.get('relationshipParentId');
                const openid = profile.openid;
                const nickName = profile.nickname;
                const shopId = ctx._subId;
                const memberService = new MemberService();
                const {
                    member,
                    success
                } = await memberService.wechatRelationshipLogin(openid, nickName, shopId, parentId);
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