import { Strategy } from 'passport-wechat';
import config from 'config';


const callbackUrl = 'http://10.dm.dianshangwan.com/log?sub=10';

export default new Strategy({
        appID: config.get('wechat.dianshangwan.appID'),
        appSecret: config.get('wechat.dianshangwan.appsecret'),
        client: 'wechat',
        callbackURL: callbackUrl,
        scope: 'snsapi_base',
        state: 123,
        // getToken: {getToken},
        // saveToken: {saveToken}
      },
      function(accessToken, refreshToken, profile, expires_in, done) {
      	//查询openid是否已存在 profile.openid
      	console.log(accessToken);
      	console.log(refreshToken);
      	console.log(profile);
      	console.log(expires_in);
        return done(err,profile);
      }
);

