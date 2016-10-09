import local from './local';
import wechat from './wechat';

export default (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    //注册本地登录策略
    passport.use(local);

    //注册微信浏览器内登陆策略
    passport.use(wechat);
}