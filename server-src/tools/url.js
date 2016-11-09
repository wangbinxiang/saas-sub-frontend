import url from 'url';
import lodash from 'lodash';

export function addQuery(urlStr, query) {
	var urlObj = url.parse(urlStr, true);
	urlObj.search = '';
	urlObj.query = lodash.merge(urlObj.query, query);

	return url.format(urlObj);
}