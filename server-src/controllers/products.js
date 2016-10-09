import ProductsService from '../models/application/ProductsService';
import ProductTypesService from '../models/application/ProductTypeService';
import {
    PRODUCT_CATEGORY_LIST
} from '../config/productConf';
import nl2br from 'nl2br';
/**
 * 添加产品页面
 * @author wangbinxiang
 * @date   2016-09-20T10:39:35+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 */
// export async function showAdd(ctx, next) {
//     const title = '新建商品';

//     let productTypeId = ctx.query.productTypeId;

//     const productTypesService = new ProductTypesService();
//     let productType = await productTypesService.get(productTypeId);
//     //productType必须有效
//     if (productType === null) {
//         throw new Error('err productType');
//     }

//     const pageJs = webpackIsomorphicTools.assets().javascript.productEdit;

//     let data = null

//     await ctx.render('products/add', {
//         title, data, pageJs, productType
//     });
// }

/**
 * 添加产品请求
 * @author wangbinxiang
 * @date   2016-09-20T10:49:47+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 */
// export async function add(ctx, next) {

//     //当前店铺id
//     let userId = ctx._subId;

//     let name = ctx.request.body.name; //string
//     let feature = ctx.request.body.feature; //string
//     let productType = ctx.request.body.productType;// integer
//     let description = ctx.request.body.description;//[]
//     let slides = ctx.request.body.slides; //[1001, 1002, 1003, 1004]

//     try {
//         const poductsService = new ProductsService();
//         let product = await poductsService.add(userId, name, feature, productType, description, slides);
//         ctx.body = product;
//         // ctx.body = {};
//     } catch (err) {
//         ctx.status = 500;
//         ctx.body = { message: err.message };
//     }
// }

/**
 * 编辑产品页面
 * @author wangbinxiang
 * @date   2016-09-20T10:40:24+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
// export async function showEdit(ctx, next) {
//     //产品id
//     ctx.params.id;
//     const title = '编辑商品';

//     const pageJs = webpackIsomorphicTools.assets().javascript.productEdit;

//     let product

//     let id = ctx.params.id;
//     const poductsService = new ProductsService();
//     product = await poductsService.get(id);

//     if (product === null) {
//         ctx.status = 404
//         await ctx.render('404');
//     } else {
//         let data = product
//         let productType = product.productType
//         await ctx.render('products/add', {
//             title, data, pageJs, productType
        
//         });
//     }
// }

/**
 * 编辑产品请求
 * @author wangbinxiang
 * @date   2016-09-20T10:51:04+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
// export async function edit(ctx, next) {
//     //产品id
//     let id = ctx.params.id;//integer
//     let name = ctx.request.body.name;//string
//     let feature = ctx.request.body.feature;//string
//     let productType = ctx.request.body.productType;// integer
//     let description = ctx.request.body.description;// []
//     let slides = ctx.request.body.slides; //[1001, 1002, 1003, 1004]

//     try {
//         const poductsService = new ProductsService();
//         let product = await poductsService.edit(id, name, feature, productType, description, slides);
//         ctx.body = product;
//         // ctx.body = {};
//     } catch (err) {
//         console.log(err);
//         ctx.status = 500;
//         ctx.body = { message: err.message };
//     }
// }

/**
 * 删除产品请求
 * @author wangbinxiang
 * @date   2016-09-28T02:11:10+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
// export async function del(ctx, next) {
//     //分类id
//     let id = ctx.params.id;
//     try {
//         const poductsService = new ProductsService();
//         let product = await poductsService.del(id);
//         ctx.body = product;
//     } catch (err) {
//         ctx.status = 500;
//         ctx.body = { message: err.message };
//     }
// }



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

    let product

    // try {
    let id = ctx.params.id;
    const poductsService = new ProductsService();
    product = await poductsService.get(id);

    if (product === null) {
        ctx.status = 404
        await ctx.render('404');
    } else {

        const title = '产品详细';

        const pageJs = webpackIsomorphicTools.assets().javascript.product;


        await ctx.render('products/detail', {
            title,
            product,
            pageJs,
            nl2br
        });
    }
}

/**
 * 产品列表页面
 * @author wangbinxiang
 * @date   2016-09-20T10:47:45+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
// export async function index(ctx, next) {
//     const title = '产品列表';

//     PRODUCT_CATEGORY_LIST

//     let number = ctx.query.number ? ctx.query.number : 1;

//     let size = ctx.query.size ? ctx.query.size : 5; 

//     let filters = {
//         userId: ctx._subId,
//         status: 0
//     };

//     let pages = {
//         number,
//         size
//     };

//     let logoWidth = 120;
//     let logiHeight = 120;

//     let products = null;

//     let isNext = false;

//     const poductsService = new ProductsService();
//     let result = await poductsService.index(filters, { number, size }, logoWidth, logiHeight);
//     if (result !== null) {
//         let page = result.page;
//         products = result.products;

//         if (page && page.haveNext()) {
//             isNext = true;
//         }
//     } 

//     if (ctx.accepts('html', 'text', 'json') === 'json') {
//         ctx.body = { products, isNext };
//     } else {

//         let productTypes = null;

//         let filters = {
//             userId: ctx._subId,
//             status: 0
//         };

//         const productTypesService = new ProductTypesService();
//         let result = await productTypesService.index('', filters, { number: 1, size: 40});

//         if (result !== null) {
//             productTypes = result.productTypes;
//         }


//         const pageJs = webpackIsomorphicTools.assets().javascript.product;

//         await ctx.render('products/index', {
//             title,
//             products, isNext, number, PRODUCT_CATEGORY_LIST, productTypes,
//             pageJs
//         });
//     }
// }

/**
 * 添加价格页面
 * @author wangbinxiang
 * @date   2016-09-20T10:55:29+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
// export async function showPrices(ctx, next) {
//     //产品id
//     const title = '产品价格管理';

//     const pageJs = webpackIsomorphicTools.assets().javascript.product;

//     let product

//     let id = ctx.params.id;
//     const poductsService = new ProductsService();
//     product = await poductsService.get(id);

//     let name = product.name 
//     let prices = product.prices

//     await ctx.render('products/prices', {
//         title,
//         id, name, prices,
//         pageJs
//     });
// }

/**
 * 添加价格请求
 * @author wangbinxiang
 * @date   2016-09-20T10:55:21+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
// export async function prices(ctx, next) {
//     //产品id
//     let id = ctx.params.id;
//     let prices = ctx.request.body.prices;//string

//     try {
//         const poductsService = new ProductsService();
//         let products =  await poductsService.addPrices(id, prices);
//         ctx.body = products;
//     } catch (err) {
//         ctx.status = 500;
//         ctx.body = { message: err.message };
//     }
// }
