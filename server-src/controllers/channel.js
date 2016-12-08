import ChannelService from '../models/application/ChannelService';
import ProductService from '../models/application/ProductService';
import config from 'config';
import lodash from 'lodash';



export async function productType(ctx, next) {
	//频道信息
	let isNext = false;

	const productTypeId = ctx.params.id;

	const number = ctx.query.number ? ctx.query.number : 1;

	const size = ctx.query.size ? ctx.query.size : 10;

	const channelService = await new ChannelService();
	let { page, products, productType } = await channelService.productType(number, size, productTypeId, ctx._subId);

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
	    	//获取当前是否有
	    	const other = config.get('productMapping.' + ctx._subId);

	    	if (other && other[productTypeId]) {
	    		const productService = new ProductService();
	    		const otherProducts = await productService.list(other[productTypeId]);
	    		if (otherProducts) {
	    			products = lodash.concat(products, otherProducts);
	    		}
	    	}
	    	
	    	const title = productType.name + ' - ' + ctx._shop.title;

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

export async function category(ctx, next) {
	//频道信息
	let isNext = false;

	const categoryId = ctx.params.id;

	const number = ctx.query.number ? ctx.query.number : 1;

	const size = ctx.query.size ? ctx.query.size : 10;

	const channelService = await new ChannelService();
	const { page, articles, category } = await channelService.category(number, size, categoryId, ctx._subId);

	if (!category) {
		//404
		await next()
	} else {
		if (page && page.haveNext()) {
			isNext = true;
		}

		if (ctx.accepts('html', 'text', 'json') === 'json') {
	        ctx.body = {
	            articles,
	            isNext
	        };
	    } else {
	    	
	    	const title = category.name + ' - ' + ctx._shop.title;

			const pageJs = webpackIsomorphicTools.assets().javascript.channel;

			await ctx.render('channel/category', {
				categoryId,
				title,
				pageJs,
				number,
				isNext,
				articles,
				category
			});
		}
	}

}