import ProductTypeAdapter from '../adapter/ProductTypeAdapter';
import ProductType from '../model/ProductType';
/**
 * 产品分类service类
 */
export default class ProductTypesService {

    constructor() {
        this.productTypeAdapter = new ProductTypeAdapter();
    }

    /**
     * 获取产品分类列表
     * @author wangbinxiang
     * @date   2016-09-20T15:30:54+0800
     * @return {[type]}                 [description]
     */
    async index(idList, filters, pages) {

            let result = await this.productTypeAdapter.get({
                idList,
                filters,
                pages
            }, ProductType);

            if (result == null) {
                return result;
            }

            let { page, result: productTypes }  = result;

            return { page, productTypes };
    }


    /**
     * 获取 productTyps信息
     * @author wangbinxiang
     * @date   2016-10-01T14:20:43+0800
     * @param  { int or array[int]}                 id productType id, int时返回单个productType对象
     *                                               array[int]时 返回  productType对象列表 key 是id
     * @return { null or productType(s)}            没找到数据时返回null, 找到时返回productType(s)
     */
    async get(id) {
            let productTypes = await this.productTypeAdapter.get({
                idList: id
            }, ProductType);
            return productTypes;
    }




    /**
     * 添加产品分类
     * @author wangbinxiang
     * @date   2016-09-20T15:31:14+0800
     */
    add(userId, name, category) {
        return this.productTypeAdapter.add({
            userId,
            name,
            category
        }, ProductType);
    }

    /**
     * 编辑产品分类
     * @author wangbinxiang
     * @date   2016-09-20T15:31:29+0800
     * @return {[type]}                 [description]
     */
    edit(id, name, category) {
        return this.productTypeAdapter.edit({
            id,
            name,
            category
        }, ProductType);
    }

    /**
     * 删除产品分类
     * @author wangbinxiang
     * @date   2016-09-20T15:31:37+0800
     * @return {[type]}                 [description]
     */
    del(id) {
        return this.productTypeAdapter.del({
            id
        }, ProductType);
    }

}