import ArticlesService from '../models/application/ArticlesService';
import nl2br from 'nl2br';
import config from 'config';

export async function detail(ctx, next) {
	//文章id
	const id = ctx.params.id;
	const articlesService = new ArticlesService();
	const article = await articlesService.get(id, ctx._subId);
	if (article === null) {
	    await next();
	} else {
	    const title = article.title + ' - ' + ctx._shop.title;

	    const pageJs = webpackIsomorphicTools.assets().javascript.article;

	    const imgHost = config.get('qiniu.bucket.subImg.url');

	    await ctx.render('articles/detail', {
	        title,
	        article,
	        pageJs,
	        nl2br,
	        imgHost
	    });
	}
}