import { Strategy } from 'passport-local';

export default new Strategy(
    {
        usernameField: 'passport',
        passwordField: 'password'
    }, async (passport, password, done) => {
        try {
            if (true) {
                let user = { passport, password };
                user.id = 1;
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (err) {
            return done(err);
        }
    }
)