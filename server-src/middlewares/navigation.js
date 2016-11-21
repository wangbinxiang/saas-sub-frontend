import NavigationService from '../models/application/NavigationService';

/**
 * 导航中间件
 * @author wangbinxiang
 * @date   2016-11-16T12:33:05+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export default async function navigation(ctx, next) {
		const navigationService = new NavigationService();
		const productTypes = await navigationService.productTypes(ctx._subId);

		if (productTypes !== null) {
			ctx.state._navigation = productTypes;
		} else {
			ctx.state._navigation = undefined;
		}

		await next();
}