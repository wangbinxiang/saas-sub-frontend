import RequestAdapter from '../../libs/RequestAdapter';
import MemberTranslator from '../translator/MemberTranslator';
import MemberRequestJsonApi from '../request/MemberRequestJsonApi';
import {
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


	wechatSignup(openid, nickName, shopId, aUserClass) {
	    this.buildRequest(MEMBER_SIGNUP, { 
	    	shopId: shopId,
	        openId: openid,
	        nickName: nickName
	    });

	    this.activeClass = aUserClass;

	    return this.request();
	}

	//验证用户 async函数
	wechatLogin(openid, aUserClass) {
	    this.buildRequest(MEMBER_LOGIN, { 
	        openId: openid
	    });

	    this.activeClass = aUserClass;

	    return this.request();
	}

}