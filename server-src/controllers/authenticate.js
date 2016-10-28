import passport from 'koa-passport';

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

