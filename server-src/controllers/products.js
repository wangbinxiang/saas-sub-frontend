import ProductService from '../models/application/ProductService';
import {
    PRODUCT_CATEGORY_LIST
} from '../config/productConf';
import nl2br from 'nl2br';
import config from 'config';


/**
 * 产品详情页面
 * @author wangbinxiang
 * @date   2016-09-20T10:44:47+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function detail(ctx, next) {
    //产品id
    let product;
    let subId = ctx._subId;
    // try {
    let id = ctx.params.id;
    const productService = new ProductService();
    product = await productService.get(id, subId);
    if (product === null) {
        ctx.status = 404
        await ctx.render('404');
    } else {

        const title = product.name + ' - ' + ctx._shop.title;

        const pageJs = webpackIsomorphicTools.assets().javascript.product;

        const imgHost = config.get('qiniu.bucket.subImg.url');

        await ctx.render('products/detail', {
            title,
            product,
            pageJs,
            nl2br,
            subId,
            imgHost
        });
    }
}
