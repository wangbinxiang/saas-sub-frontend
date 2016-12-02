import CategoryAdapter from '../adapter/CategoryAdapter';
import Category from '../model/Category';
/**
 * 产品分类service类
 */
export default class CategoriesService {

    constructor() {
        this.categoryAdapter = new CategoryAdapter();
    }

    /**
     * 获取产品分类列表
     * @author wangbinxiang
     * @date   2016-09-20T15:30:54+0800
     * @return {[type]}                 [description]
     */
    async index(idList, filters, pages) {

        let result = await this.categoryAdapter.get({
            idList,
            filters,
            pages
        }, Category);

        if (result == null) {
            return result;
        }

        let { page, result: categories }  = result;

        return { page, categories };
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
        let productTypes = await this.categoryAdapter.get({
            idList: id
        }, Category);
        return productTypes;
    }




    /**
     * 添加产品分类
     * @author wangbinxiang
     * @date   2016-09-20T15:31:14+0800
     */
    async add(userId, name) {
        return await this.categoryAdapter.add({
            userId,
            name
        }, Category);
    }

    /**
     * 编辑产品分类
     * @author wangbinxiang
     * @date   2016-09-20T15:31:29+0800
     * @return {[type]}                 [description]
     */
    async edit(id, name) {
        return await this.categoryAdapter.edit({
            id,
            name
        }, Category);
    }

    /**
     * 删除产品分类
     * @author wangbinxiang
     * @date   2016-09-20T15:31:37+0800
     * @return {[type]}                 [description]
     */
    async del(id) {
        return await this.categoryAdapter.del({
            id
        }, Category);
    }

}