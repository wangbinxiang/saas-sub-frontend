import Router from 'koa-router';
import passport from 'koa-passport';
import { showSignUp, showSignIn } from '../../controllers/auth';

const router = Router();

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