import config from 'config';
/**
 * 是否是关联注册方式
 * @author wangbinxiang
 * @date   2016-11-17T15:50:59+0800
 * @param  {[type]}                 shopId [description]
 * @return {Boolean}                       [description]
 */
export function isAuthRelationship(ctx) {
	const relationSub = config.get('relationshipSub');
	if (relationSub.indexOf(ctx._subId) === -1) {
		return false;
	}
	return true;
}

/**
 * 是否是普通注册方式
 * @author wangbinxiang
 * @date   2016-11-19T14:10:43+0800
 * @param  {[type]}                 ctx [description]
 * @return {[type]}                     [description]
 */
export function isAuthNormal(ctx) {
	const relationSub = config.get('relationshipSub');

	if (relationSub.indexOf(ctx._subId) === -1) {
		return true;
	}
	return false;
}