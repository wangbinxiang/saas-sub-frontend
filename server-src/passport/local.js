import {
    Strategy
} from 'passport-local';
import md5 from 'md5';
// import AuthenticateService from '../models/application/AuthenticateService';

export default new Strategy({
    usernameField: 'passport',
    passwordField: 'password'
}, async (passport, password, done) => {
    try {
        let md5Password = md5(passport).substr(0, 6);
        console.log(md5Password);
        if (md5Password === password) {
            done('', {
                id: passport
            });
        } else {
            done(null, false, {
                message: 'Unknown user'
            });
        }
    } catch (err) {
        return done(err);
    }
})