import ProductTypesService from '../models/application/ProductTypeService';
import {
    PRODUCT_CATEGORY_LIST,
    PRODUCT_CATEGORY_COMMON
} from '../config/productConf';
/**
 * 产品分类列表页面
 * @author wangbinxiang
 * @date   2016-09-20T14:16:01+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function index(ctx, next) {
    //翻页，页数，每页多少行数据
    //accepts('html', 'text', 'json');
    let number = ctx.query.number ? ctx.query.number : 1;

    let size = ctx.query.size ? ctx.query.size : 20;

    let filters = {
        userId: ctx._subId,
        status: 0
    };

    let pages = {
        number,
        size
    };

    const title = '商品分类管理';

    const pageJs = webpackIsomorphicTools.assets().javascript.productType;


    const productTypesService = new ProductTypesService();
    let page, productTypes;
    
    let result = await productTypesService.index('', filters, pages);

    let moreInfo = false;

    if (result === null) {
        productTypes = null;
    } else {
        page = result.page;
        productTypes = result.productTypes;

        if (page && page.haveNext()) {
            moreInfo = true;
        }
    } 
    if (ctx.accepts('html', 'text', 'json') === 'json') {
            ctx.body = {
                productTypes,
                moreInfo
            };
    } else {
        
        await ctx.render('productTypes/index', {
            title,
            number,
            moreInfo,
            productTypes,
            PRODUCT_CATEGORY_COMMON, //通用商品类型
            PRODUCT_CATEGORY_LIST, //商品类型列表
            pageJs
        });
    }
}


/**
 * 添加产品分类请求
 * @author wangbinxiang
 * @date   2016-09-20T14:18:53+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 */
export async function add(ctx, next) {
    //当前店铺id
    let userId = ctx._subId;
    //分类名称
    let name = ctx.request.body.name;
    //分类的品类
    let category = ctx.request.body.category;
    try {
        const productTypesService = new ProductTypesService();
        let productType = await productTypesService.add(userId, name, category);
        ctx.body = productType;
        // ctx.body = {};
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            message: err.message
        };
    }
}

/**
 * 编辑产品分类请求
 * @author wangbinxiang
 * @date   2016-09-20T14:56:48+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function edit(ctx, next) {
    //分类id
    let id = ctx.params.id;
    //分类名称
    let name = ctx.request.body.name;
    //分类的品类
    let category = ctx.request.body.category;
    try {
        const productTypesService = new ProductTypesService();
        let productType = await productTypesService.edit(id, name, category);
        ctx.body = productType;
        // ctx.body = {};
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            message: err.message
        };
    }
}

/**
 * 删除产品分类请求
 * @author wangbinxiang
 * @date   2016-09-20T14:56:59+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function del(ctx, next) {
    //分类id
    let id = ctx.params.id;
    try {
        const productTypesService = new ProductTypesService();
        let productType = await productTypesService.del(id);
        ctx.body = {};
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            message: err.message
        };
    }
}