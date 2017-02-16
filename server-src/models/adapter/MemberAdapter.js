import RequestAdapter from '../../libs/RequestAdapter';
import MemberTranslator from '../translator/MemberTranslator';
import MemberRequestJsonApi from '../request/MemberRequestJsonApi';
import pageCLass from '../model/page';
import {
	MEMBER_GET,
	MEMBER_SIGNUP,
	MEMBER_LOGIN,
	MEMBER_SOURCE_LOGIN,
	MEMBER_SOURCE_SIGNUP,
    MEMBER_PARENT,
    MEMBER_CHILDREN
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

	parent({
		id
	}, aMemberClass) {
		this.buildRequest(MEMBER_PARENT, {
			id
		});

		//如果idList是数组 则需要数组形式的结果
		this.needArrayResult(id)

		this.activeClass = aMemberClass;

		return this.request();
	}

	children({
		id,
		filters,
		pages,
		sort
	}, aMemberClass) {
		this.buildRequest(MEMBER_CHILDREN, {
			id,
			filters,
			pages,
			sort
		});

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

	//第三方网站登陆
	sourceLogin(unionId, source, sourceId, aUserClass) {
		this.buildRequest(MEMBER_SOURCE_LOGIN, { 
			unionId,
	        source,
	        sourceId
	    });

	    this.activeClass = aUserClass;

	    return this.request();
	}

	//第三方网站注册
	sourceSignup(openId, nickName, shopId, parentId, unionId, source, sourceId, aUserClass) {

		this.buildRequest(MEMBER_SOURCE_SIGNUP, { 
			shopId,
		    openId,
		    nickName,
		    parentId,
		    unionId,
		    source,
		    sourceId
		});

		this.activeClass = aUserClass;

		return this.request();
	}
}