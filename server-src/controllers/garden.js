import ChannelService from '../models/application/ChannelService';
import config from 'config';



export async function articles(ctx, next) {

    const title = ctx._shop.title? ctx._shop.title: '产业资讯';

    const pageJs = webpackIsomorphicTools.assets().javascript.index;

    const imgHost = config.get('qiniu.bucket.subImg.url');

    const imgStyle = config.get('qiniu.bucket.subImg.style.productWaterFall');


    const channelService = new ChannelService()
    await channelService.gardenArticles(ctx._subId)

    await ctx.render('garden/articles', {
        title, pageJs,
        imgHost,
        imgStyle
    });
}


export async function products(ctx, next) {

    const title = ctx._shop.title? ctx._shop.title: '苗木交易';

    const pageJs = webpackIsomorphicTools.assets().javascript.index;

    const imgHost = config.get('qiniu.bucket.subImg.url');

    const imgStyle = config.get('qiniu.bucket.subImg.style.productWaterFall');

    const id = ctx.query.id? ctx.query.id: 0;

    const channelService = new ChannelService()
    await channelService.gardenProducts(ctx._subId, id)

    await ctx.render('garden/products', {
        title, pageJs,
        imgHost,
        imgStyle
    });
}



export async function projects(ctx, next) {

	const title = ctx._shop.title? ctx._shop.title: '首页';

    const imgHost = config.get('qiniu.bucket.subImg.url');

    const imgStyle = config.get('qiniu.bucket.subImg.style.productWaterFall');

    const id = ctx.query.id? ctx.query.id: 0;

    const channelService = new ChannelService()
    await channelService.gardenProjects(ctx._subId, id)

    await ctx.render('garden/projects', {
        title,
        imgHost,
        imgStyle
    });
}

