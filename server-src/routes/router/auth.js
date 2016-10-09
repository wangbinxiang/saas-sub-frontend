import Router from 'koa-router';
import passport from 'koa-passport';
import { showSignUp, showSignIn } from '../../controllers/auth';
import { Payment } from 'wechat-pay';
import fs from 'fs';
import path from 'path';

const p12 = path.resolve(__dirname, '../../../config/apiclient_cert.p12');
const p12File = fs.readFileSync(p12);

var initConfig = {
  // partnerKey: "<partnerkey>",
  appId: "wx73fc850b69d5209f",
  mchId: "1390442102",
  notifyUrl: "http://10.sub.dianshangwan.com/pay/notify",
  pfx: p12File
};
var payment = new Payment(initConfig);


const router = Router();


router.get('/pay/', async (ctx, next) => {
    const openid = ctx.state.user.openId;

    var order = {
      body: '吮指原味鸡 * 1',
      attach: '{"部位":"三角"}',
      out_trade_no: 'kfc' + (+new Date),
      total_fee: 123.45,
      spbill_create_ip: ctx.ip,
      openid: openid,
      trade_type: 'JSAPI'
    };
    

    let payargs = await new Promise((resolve, reject) => {
        payment.getBrandWCPayRequestParams(order, function(err, payargs){
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(payargs);
            }
        });
    });

    console.log(payargs);

    await ctx.render('pay/index', {
        payargs
    });


});




//注册页面
router.get('/signup', async (ctx, next) => {
    console.log(Router.url('signup'));
    console.log('signStart');
    await next();
    console.log('signEnd');
}, showSignUp);

//注册
router.post('/signup', async (ctx, next) => {

});


//登陆页面
router.get('/signin', async (ctx, next) => {
    console.log(Router.url('signin'));
    console.log('signStart');
    await next();
    console.log('signEnd');
}, showSignIn);


//登陆
router.post('/signin',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/'
    })
    // passport.authenticate('local', {
    //     successRedirect: '/',
    //     failureRedirect: '/sign/signup'
    // }), 

);

router.get('/wechat/auth/callback', async (ctx, next) => {
    try {
        let res = await passport.authenticate('wechat')(ctx, next);
        ctx.redirect('/');
    } catch (err) {
        console.log(err);
        ctx.redirect('/');
    }
});

//退出登录
router.get('signout', async (ctx, next) => {

});

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