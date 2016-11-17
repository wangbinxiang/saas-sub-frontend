import { notNeedRelationship } from '../../tools/signup';

//关系型注册屏蔽掉其他注册方式的站点
export async function signupRelationshipBlock(ctx, next) {
	//不自动注册
	if (notNeedRelationship(ctx._subId)) {
		throw new Error('signup relationship block');
	} else {
		await next();
	}

	//扫码注册关联相关用户
	

	//点击注册关联相关用户
}

//普通注册屏蔽掉非其他注册方式的站点
export async function signupNormalBlock(ctx, next) {

	if (notNeedRelationship(ctx._subId)) {
		await next();
	} else {
		throw new Error('signup normal block');
	}
}



//微信端
//大美不自动注册登陆
//
//其他网站自动注册登陆？