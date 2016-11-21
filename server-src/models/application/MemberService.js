import MemberAdapter from '../adapter/MemberAdapter';
import Member from '../model/Member';
import RequestJsonApiParamsError from '../../libs/error/RequestJsonApiParamsError';


export default class MemberService {
	constructor() {
		this.userAdapter = new MemberAdapter();
	}


	async wechatLogin(openid, nickName, shopId, unionId) {
		let member;

		try {
			member = await this.userAdapter.wechatLogin(unionId, Member);
		} catch (err) {
			switch (err.constructor) {
				case RequestJsonApiParamsError:
					//登陆失败用openid和nickname注册用户
					member = await this.userAdapter.wechatSignup(openid, nickName, shopId, null, unionId, Member);
					break;
				default:
					throw err;
			}
		}

		return member;
		//登陆用户
	}

	async wechatRelationshipLogin(openid, nickName, shopId, parentId, unionId) {
		let member, success = false; //关联是否成功标示

		try {
			member = await this.userAdapter.wechatLogin(unionId, Member);
		} catch (err) {
			switch (err.constructor) {
				case RequestJsonApiParamsError:
					//登陆失败用openid和nickname注册用户
					member = await this.userAdapter.wechatSignup(openid, nickName, shopId, parentId, unionId, Member);
					//关联成功
					success = true;
					break;
				default:
					throw err;
			}
		}

		return {
			member,
			success
		};
		//登陆用户
	}
}