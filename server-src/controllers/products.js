import ProductsService from '../models/application/ProductsService';
import ProductTypesService from '../models/application/ProductTypeService';
import {
    PRODUCT_CATEGORY_LIST
} from '../config/productConf';
import nl2br from 'nl2br';


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
    ctx.params.id;

    let product;
    console.log(ctx._subId);
    let subId = ctx._subId;
    // try {
    let id = ctx.params.id;
    const poductsService = new ProductsService();
    product = await poductsService.get(id);
    console.log(product);
    if (product === null || parseInt(product.userId) !== subId) {
        ctx.status = 404
        await ctx.render('404');
    } else {

        const title = '产品详细';

        const pageJs = webpackIsomorphicTools.assets().javascript.product;


        await ctx.render('products/detail', {
            title,
            product,
            pageJs,
            nl2br,
            subId
        });
    }
}
