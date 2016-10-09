import MemberAdapter from '../adapter/MemberAdapter';
import Member from '../model/Member';
import RequestJsonApiParamsError from '../../libs/error/RequestJsonApiParamsError';


export default class MemberService {
	constructor() {
        this.userAdapter = new MemberAdapter();
    }


	async wechatLogin(openid, nickName, shopId) {
		let member;

		try {
			member = await this.userAdapter.wechatLogin(openid, Member);
		} catch (err) {
			console.log(err.constructor === RequestJsonApiParamsError);
			switch(err.constructor) {
				case RequestJsonApiParamsError:
					//登陆失败用openid和nickname注册用户
					member = await this.userAdapter.wechatSignup(openid, nickName, shopId, Member);
					break;
				default:
					throw err;
			}
		}
		console.log(member);

		return member;
        //登陆用户
	}


}