import MemberAdapter from '../adapter/MemberAdapter';
import Member from '../model/Member';
import RequestJsonApiParamsError from '../../libs/error/RequestJsonApiParamsError';


export default class MemberService {
	constructor() {
		this.userAdapter = new MemberAdapter();
	}

	async get(idList) {
		const members = await this.userAdapter.get({
			idList
		}, Member);

		return members;
	}
	
	async _isCellphoneBind(cellPhone) {
		const filters = {
			cellPhone
		};

		const pages = {
			number: 1,
        	size: 0
		}


		const member = await this.userAdapter.get({
			filters,
			pages
		}, Member);

		if (member) {
			return true;
		}

		return false;
	}

	async isCellphoneSignup(cellPhone) {
		return await this._isCellphoneBind(cellPhone);
	}

	async wechatLogin(openid, nickName, shopId, unionId) {
		let member;

		try {
			member = await this.userAdapter.wechatLogin(unionId, Member);
		} catch (err) {
			switch (err.constructor) {
				case RequestJsonApiParamsError:
					//登陆失败用openid和nickname注册用户
					member = await this.userAdapter.wechatSignup(openid, nickName, shopId, undefined, unionId, Member);
					break;
				default:
					throw err;
			}
		}

		return member;
		//登陆用户
	}

	async wechatRelationshipLogin(profile, openid, nickName, shopId, parentId, unionId) {
		const openid = profile.openid;
		const nickName = profile.nickname;
		const unionId = profile.unionid;
		const headimgurl = profile.headimgurl;

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

	async wechatRelationshipSourceLogin(openid, nickName, shopId, parentId, unionId, source, sourceId) {
		let member, success = false; //关联是否成功标示

		try {
			member = await this.userAdapter.sourceLogin(unionId, source, sourceId, Member);
		} catch (err) {
			switch (err.constructor) {
				case RequestJsonApiParamsError:
					//登陆失败用openid和nickname注册用户
					member = await this.userAdapter.sourceSignup(openid, nickName, shopId, parentId, unionId, source, sourceId, Member);
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


	async bindCellphone(uid, cellPhone){
		const isCellphoneBind = await this._isCellphoneBind(cellPhone);

		//手机已绑定
		if (isCellphoneBind) {
			return false;
		}
		return true;

	}


	async relationship(uid) {
		let parent, children, childrenCount
		try {
			parent = await this.userAdapter.parent({id: uid}, Member)
		} catch (err) {
			
		}
		try {
			const sort = '-id';
			const pages = {
		        number: 1,
		        size: 50
		    };
			const childrenResult = await this.userAdapter.children({ id: uid, pages, sort }, Member)
			if (childrenResult && childrenResult.result) {
				children = childrenResult.result
				childrenCount = childrenResult.count? childrenResult.count: 0
			}
		} catch (err) {
			
		}
		return {
			parent,
			children,
			childrenCount
		}
	}
}