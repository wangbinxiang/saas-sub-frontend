import Router from 'koa-router';
import passport from 'koa-passport';
import { showSignUp, showSignIn } from '../../controllers/auth';
import { Payment } from 'wechat-pay';
import fs from 'fs';
import path from 'path';
import ProductsService from '../../models/application/ProductsService';
import OrderService from '../../models/application/OrderService';

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


router.get('/pay', async (ctx, next) => {
    const orderId = ctx.query.id;

    const orderService = new OrderService();

    let result = await orderService.get(orderId);

    if (result) {

      console.log(result)
      const poductsService = new ProductsService();
      let product = await poductsService.get(result.productList.order_product_id);

      if (product) {
        let openid = ctx.state.user.openId;
        // let openid = 'osgj-wm-CKTT4K3xJoBoxh78w73w';
        console.log(product.prices[result.productList.product_price_index].title);
        var order = {
          body: product.name,//产品名称
          attach: product.prices[result.productList.product_price_index].title,//价格名称
          out_trade_no: 'dsw' + (+new Date),
          total_fee: result.price * 100,//单位为分
          spbill_create_ip: ctx.ip,
          openid: openid,
          trade_type: 'JSAPI'
        };
        
        console.log(order);

        let payargs = await new Promise((resolve, reject) => {
            payment.getBrandWCPayRequestParams(order, function(err, payargs){
                if (err) {
                    reject(err);
                } else {
                    resolve(payargs);
                }
            });
        });

        console.log(payargs);

        await ctx.render('pay/index', {
            payargs,
            order: result,
            product
        });

      }
    } else {
      ctx.status = 404
      await ctx.render('404');
    }

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