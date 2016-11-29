import RequestAdapter from '../../libs/RequestAdapter';
import MemberTranslator from '../translator/MemberTranslator';
import MemberRequestJsonApi from '../request/MemberRequestJsonApi';
import pageCLass from '../model/page';
import {
	MEMBER_GET,
	MEMBER_SIGNUP,
	MEMBER_LOGIN
} from '../../config/apiFeatureConf';


export default class MemberAdapter extends RequestAdapter {
	constructor() {
		super();
		this.translator = new MemberTranslator();
	}

	buildRequest(apiFeature, data) {
		this.requestObject = new MemberRequestJsonApi(apiFeature, data);
	}

	get({
		idList,
		filters,
		pages
	}, aMemberClass) {
		this.buildRequest(MEMBER_GET, {
			idList,
			filters,
			pages
		});

		//如果idList是数组 则需要数组形式的结果
		this.needArrayResult(idList)

		this.translator.pageClass = pageCLass;

		this.activeClass = aMemberClass;

		return this.request();
	}
	

	wechatSignup(openId, nickName, shopId, parentId, unionId, aUserClass) {
	    this.buildRequest(MEMBER_SIGNUP, { 
	    	shopId,
	        openId,
	        nickName,
	        parentId,
	        unionId
	    });

	    this.activeClass = aUserClass;

	    return this.request();
	}

	//验证用户 async函数
	wechatLogin(unionId, aUserClass) {
	    this.buildRequest(MEMBER_LOGIN, { 
	        unionId: unionId
	    });

	    this.activeClass = aUserClass;

	    return this.request();
	}

}