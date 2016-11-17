import config from 'config';
/**
 * 是否是需要关联注册的网站，如果是，则不自动注册
 * @author wangbinxiang
 * @date   2016-11-17T15:50:59+0800
 * @param  {[type]}                 shopId [description]
 * @return {Boolean}                       [description]
 */
export function notNeedRelationship(shopId) {
	const relationSub = config.get('relationshipSub');

	if (relationSub.indexOf(shopId) === -1) {
		return true
	}
	return false
}