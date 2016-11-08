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
    } catch (err) {
        throw err;
    }
}

export async function faker(ctx, next) {
    if (__DEVELOPMENT__) {
        try {
            await passport.authenticate('faker', async (user, info, status) => {
                if (user === false) {
                    ctx.status = 401;
                    ctx.body = info;
                } else {
                    ctx.login(user);
                    ctx.status = 200;
                    ctx.body = user;
                }
            })(ctx, next);
        } catch (err) {
            throw err;
        }
    } else {
        ctx.status = 404
        await ctx.render('404');
    }
}

export async function logout(ctx, next) {
    ctx.logout()
    ctx.redirect('/')
}

