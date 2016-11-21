import ChannelService from '../models/application/ChannelService';
import config from 'config';



export async function productType(ctx, next) {
	//频道信息
	let isNext = false;

	const title = '分类频道';

	const productTypeId = ctx.params.id;

	const number = ctx.query.number ? ctx.query.number : 1;

	const size = ctx.query.size ? ctx.query.size : 10;

	const channelService = await new ChannelService();
	const { page, products, productType } = await channelService.productType(number, size, productTypeId, ctx._subId);

	if (!productType) {
		//404
		await next()
	} else {
		if (page && page.haveNext()) {
			isNext = true;
		}

		if (ctx.accepts('html', 'text', 'json') === 'json') {
	        ctx.body = {
	            products,
	            isNext
	        };
	    } else {

			const imgHost = config.get('qiniu.bucket.subImg.url');

			const imgStyle = config.get('qiniu.bucket.subImg.style.productWaterFall');

			const pageJs = webpackIsomorphicTools.assets().javascript.channel;

			await ctx.render('channel/productType', {
				productTypeId,
				title,
				pageJs,
				number,
				imgHost,
				imgStyle,
				isNext,
				products,
				productType,
			});
		}
	}
}