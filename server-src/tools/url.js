import url from 'url';
import lodash from 'lodash';

/**
 * urlStr 添加querty
 * @author wangbinxiang
 * @date   2016-11-22T16:14:06+0800
 * @param  {string}                 urlStr 原链接
 * @param  {object}                 query  需要添加的query 必须是类似 {a: '123', b: '234'};
 */
export function addQuery(urlStr, query) {
	let urlObj = url.parse(urlStr, true);
	urlObj.search = '';
	urlObj.query = lodash.merge(urlObj.query, query);

	return url.format(urlObj);
}

export function queryNotMatch(urlStr, query) {
    const urlObj = url.parse(urlStr, true);
    if (lodash.isEmpty(urlObj.query)) {
        return true;
    }
    for(let key in query) {
        if (urlObj.query[key] !== query[key]) {
            return true;
        }
    }
    return false;
}

/**
 * 获取url的query
 * @author wangbinxiang
 * @date   2017-01-09T11:16:58+0800
 * @param  {[type]}                 urlStr [description]
 * @return {[type]}                        [description]
 */
export function getQuery(urlStr) {
    var urlObj = url.parse(urlStr, true)
    return urlObj.query
}