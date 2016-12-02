import { isAuthRelationship } from '../../tools/auth';
import { inWehcat } from '../../tools/wechat';
import { addQuery, queryNotMatch } from '../../tools/url';

export async function productRedirect(ctx, next) {
	if (inWehcat(ctx)) {
		if (ctx.isAuthenticated()) {
			//如果是关联用户站点，参数没有p或者值不对
			const parentQuery = { p: ctx.state.user.id.toString() };
			if (isAuthRelationship(ctx) && queryNotMatch(ctx.url, parentQuery)) {
				const redirectUrl = addQuery(ctx.url, parentQuery);
				console.log(redirectUrl);
				ctx.redirect(redirectUrl);
			} else {
				await next();
			}
		} else {

			//如果p参数大于0 则说明是关联prentId, 修改wechat auth链接
			if(ctx.query.p && ctx.query.p > 0) {
				const parentQuery = { parentId: ctx.query.p};
				ctx.state.__AUTH_WECHAT_LINK__ = addQuery(ctx.state.__AUTH_WECHAT_LINK__, parentQuery);
			}
			await next();
		}
	}  else {
		await next();
	}
}