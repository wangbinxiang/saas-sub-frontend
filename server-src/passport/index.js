import local from './local'

export default (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    //注册本地登录策略
    passport.use(local);

}