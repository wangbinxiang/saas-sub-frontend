import passport from 'koa-passport';
import AuthenticateService from '../models/application/AuthenticateService';
import VerificationCodeService from '../models/application/VerificationCodeService';
import moment from 'moment';
import {
    REGISTER_CODE
} from '../config/verificationCodeConf';
import VerificationCodeError from '../models/error/VerificationCodeError';



// export async function showRegister(ctx, next) {
//     const title = '注册';
//     const pageJs = webpackIsomorphicTools.assets().javascript.auth;
//     // ctx.cookies.set('test', 'signUp');
//     // ctx.cookies.set('test2', 'signUp2');

//     // const authenticateService = new AuthenticateService();
//     // let user = await authenticateService.get([1,2,3,4]);

//     await ctx.render('authhenticate/register', {
//         title,
//         pageJs
//     });
// }

// export async function register(ctx, next) {
//     console.log(ctx.request.body);
//     let cellPhone = ctx.request.body.cellPhone;
//     let password = ctx.request.body.password;
//     let rePassword = ctx.request.body.rePassword;
//     //验证码
//     let code = ctx.request.body.code;

//     try {
//         const authenticateService = new AuthenticateService();
//         let user = await authenticateService.register(cellPhone, password, code, ctx.session);

//         ctx.body = {
//             success: true
//         };
//     } catch (err) {
//         if (err instanceof VerificationCodeError) {
//             ctx.status = 500;
//             ctx.body = {
//                 message: err.message
//             };
//         } else {
//             throw err;
//         }
//     }
//     // if (!user) {
//     //     ctx.redirect('/register');
//     // }
//     // let title    = '注册成功';
//     // let info     = '注册成功，请登录。';
//     // let location = '/login';
//     // await ctx.render('common/info', {
//     //     title, info, location
//     // });
// }

export async function sendRegisterVerificationCode(ctx, next) {
    let cellPhone = ctx.query.cellPhone;
    console.log(cellPhone);
    try {
        const verificationCodeService = new VerificationCodeService(ctx.session, cellPhone);
        await verificationCodeService.sendRegister();
        ctx.body = {
            success: true
        };
    } catch (err) {
        if (err instanceof VerificationCodeError) {
            ctx.status = 500;
            ctx.body = {
                success: false,
                message: err.message
            };
        } else {
            throw err;
        }
    }

    // if (ctx.query.code) {
    //     try{
    //         const verificationCodeService = new VerificationCodeService(ctx.session, cellPhone);
    //         verificationCodeService.checkRegister(ctx.query.code);
    //     } catch (err) {
    //         if (err instanceof VerificationCodeError) {
    //             console.log(err.message);
    //         } else {
    //             throw err;    
    //         }
    //     }
    // };


    // console.log(moment().unix());
    //检查session是否发送
    // let high = 999999;
    // let low = 100000;
    // let code = Math.floor(Math.random() * (high - low + 1) + low);
    // console.log(code);
    //检查手机号是否正确
    //生成验证码
    //发送验证码
    //返回信息

}

export async function phoneNum(ctx, next) {

    let cellPhone = ctx.request.body.cellPhone;
    console.log(cellPhone);
    //生成验证码

    //检查验证时间
    //一分钟之后才可再次验证
    // ctx.session.registerVerificationTime = '';

    ctx.body = {
        success: true
    };
    //发送验证码

    //返回发送成功
}

export async function showLogin(ctx, next) {
    if (ctx.header.referer) {
        ctx.session.returnTo = ctx.header.referer;
    };
    const title = '登录';

    const pageJs = webpackIsomorphicTools.assets().javascript.auth;
    // ctx.cookies.set('test', 'signUp');
    // ctx.cookies.set('test2', 'signUp2');

    await ctx.render('authhenticate/login', {
        title,
        pageJs
    });
}

export async function login(ctx, next) {
    try {
        await passport.authenticate('local', async (user, info, status) => {
            if (user === false) {
                ctx.status = 401;
                ctx.body = info;
            } else {
                ctx.login(user);
                ctx.status = 200;
                ctx.body = {};
            }
        })(ctx, next);
    } catch (e) {
        throw e;
    }
}

export async function logout(ctx, next) {
    ctx.logout()
    ctx.redirect('/')
}


export async function showUpdatePassword(ctx, next) {
    const title = '修改密码';

    const pageJs = webpackIsomorphicTools.assets().javascript.auth;

    await ctx.render('authhenticate/updatePassword', {
        title,
        pageJs
    });
}


export async function updatePassword(ctx, next) {
    console.log(ctx.session.passport);

    console.log(ctx.request.body);

    const authenticateService = new AuthenticateService();
    let user = await authenticateService.updatePassword(ctx.session.passport.user.id, ctx.request.body.oldPassword, ctx.request.body.password);

    if (!user) {
        ctx.redirect('/user/change-password')
    };

    //退出登录
    // ctx.logout();
    console.log(123);
    let title = '修改密码成功';
    let info = '修改密码成功，请登录。';
    let location = '/login';
    await ctx.render('common/info', {
        title,
        info,
        location
    });
}