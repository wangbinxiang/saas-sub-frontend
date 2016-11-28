import MemberService from '../models/application/MemberService';
import VerificationCodeService from '../models/application/VerificationCodeService';

export async function showSignUp(ctx, next) {

    const title = '注册';
    const pageJs = webpackIsomorphicTools.assets().javascript.auth;
    // ctx.cookies.set('test', 'signUp');
    // ctx.cookies.set('test2', 'signUp2');

    await ctx.render('auth/signup', {
        title, pageJs
    });
}

export async function signUp(ctx, next) {
    
}

export async function showSignIn(ctx, next) {

    const title = '登录';

    const pageJs = webpackIsomorphicTools.assets().javascript.auth;
    // ctx.cookies.set('test', 'signUp');
    // ctx.cookies.set('test2', 'signUp2');

    await ctx.render('auth/signin', {
        title, pageJs
        });
}

export async function signIn(ctx, next) {
    
}


export async function bindCellphone(ctx, next) {
    const cellPhone = ctx.request.body.cellPhone;
    const uid = ctx.state.uid.id;

    const memberService = new MemberService();
    const result = await memberService.bindCellphone(uid, cellPhone);
    ctx.body = result;
}


//检查手机是否已注册
export async function isCellphoneSignup(ctx, next) {
    //验证手机号
    const cellPhone = ctx.query.cellPhone;

    const memberService = new MemberService();
    const isCellphoneSignup = await memberService.isCellphoneSignup(cellPhone);

    let result = 0;
    if (isCellphoneSignup) {
        result = 1;
    } 

    ctx.body = result;
}

//发送验证码
export async function sendBindCellphoneVerificationCode(ctx, next) {
    let cellPhone  = ctx.query.cellPhone;

    const verificationCodeService = new VerificationCodeService(ctx.session);
    const result = verificationCodeService.sendBind(cellPhone);

    console.log(result);
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
    ctx.body = { success: result };
}

//提交修改验证码请求
export async function checkBindCellphoneVerificationCode(ctx, next) {
    let cellPhone  = ctx.request.body.cellPhone;
    let code = ctx.request.body.code;

    const verificationCodeService = new VerificationCodeService(ctx.session);
    const result = verificationCodeService.checkBind(cellPhone, code);
    console.log('checkBindCellphoneVerificationCode');
    console.log(result);
    if (result) {
        await next();
    } else {
        //手机验证码错误
        ctx.status = 403
        ctx.body = {
            code: 'error code'
        }
    }
}









