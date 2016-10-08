export default async (ctx, next) => {

	if (ctx.isAuthenticated()) {
        ctx.redirect('/products');
    }

	const title = '首页';

	const pageJs = webpackIsomorphicTools.assets().javascript.index;

	await ctx.render('index/index', {
	title, pageJs
	})
}
