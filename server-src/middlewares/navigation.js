import NavigationService from '../models/application/NavigationService';
import config from 'config';

/**
 * 导航中间件
 * @author wangbinxiang
 * @date   2016-11-16T12:33:05+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export default async function navigation(ctx, next) {

	const layout = config.get('layout');



	const shopLayout = layout[ctx._subId]

	if (shopLayout && shopLayout.navigation) {
		
		ctx.state._navigation = shopLayout.navigation

	} else {
		const navigationService = new NavigationService();
		const productTypes = await navigationService.productTypes(ctx._subId);

		if (productTypes !== null) {
			ctx.state._navigation = productTypes;
		} else {
			ctx.state._navigation = undefined;
		}

		const categories = await navigationService.categories(ctx._subId);

		if (categories !== null) {
			ctx.state._categories = categories;
		} else {
			ctx.state._categories = undefined;
		}


		//项目合作
		const projectTypes = await navigationService.projectTypes(ctx._subId);

		if (projectTypes !== null) {
			ctx.state._projectTypes = projectTypes;
		} else {
			ctx.state._projectTypes = undefined;
		}
	}

	await next();
}