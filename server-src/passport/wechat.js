<<<<<<< HEAD
import {
    Strategy
} from 'passport-wechat';
import config from 'config';
import MemberService from '../models/application/MemberService';


const callbackUrl = 'http://10.sub.dianshangwan.com/wechat/auth/callback';
=======
import { Strategy } from 'passport-wechat';
import config from 'config';


const callbackUrl = 'http://10.dm.dianshangwan.com/log?sub=10';
>>>>>>> cb02c74e07006363e1c1a8e7e246084e83df0ef3

export default new Strategy({
        appID: config.get('wechat.dianshangwan.appID'),
        appSecret: config.get('wechat.dianshangwan.appsecret'),
        client: 'wechat',
        callbackURL: callbackUrl,
<<<<<<< HEAD
        scope: 'snsapi_userinfo',
        state: 123,
        // getToken: {getToken},
        // saveToken: {saveToken}
    },
    async (accessToken, refreshToken, profile, expires_in, done) => {
        //查询openid是否已存在 profile.openid
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        console.log(expires_in);

        let openid = profile.openid;
        let nickName = profile.nickname;
        let shopId = 10;
        const memberService = new MemberService();
        let member = await memberService.wechatLogin(openid, nickName, shopId);

        if (member) {
            return done(null, member);
        }

        return done(new Error('wechat login fail'));
        
        //用openid登陆

        //登陆失败用openid和nickname注册用户

        //然后获取用户信息

        //登陆用户


        
    }
);
=======
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

>>>>>>> cb02c74e07006363e1c1a8e7e246084e83df0ef3
