import ArticleAdapter from '../adapter/ArticleAdapter';
import Article from '../model/Article';
import CategoryAdapter from '../adapter/CategoryAdapter';
import Category from '../model/Category';
import lodash from 'lodash';
import { checkResourcesOwner } from '../../libs/helper';
import { ARTICLE_STATUS_PUBLISH } from '../../config/articleConf'
/**
 * 产品分类service类
 */
export default class ArticlesService {

    constructor() {
        this.articleAdapter = new ArticleAdapter();
    }

    /**
     * 获取文章
     * @author wangbinxiang
     * @date   2016-09-20T15:30:54+0800
     * @return {[type]}                 [description]
     */
    async index(filters, pages) {

        let result = await this.articleAdapter.get({
            filters,
            pages
        }, Article);

        if (result === null) {
            return null;
        }

        let { page, result: articles }  = result;

        let categoryIds = [];
        for (let article of articles) {
            categoryIds.push(article.categoryId);
        }

        if (categoryIds.length > 0) {
            const categoryAdapter = new CategoryAdapter();
            const categories = await categoryAdapter.get({ idList: categoryIds }, Category);
            if(categories !== null){
                for (let i in articles) {
                    const categoryKey = lodash.findIndex(categories, function(o) { return o.id === articles[i].categoryId; });
                    articles[i].category = categories[categoryKey];
                }
            }
        }


        return { page, articles };
    }


    /**
     * 获取文章
     * @author wangbinxiang
     * @date   2016-10-01T14:20:43+0800
     * @param  { int or array[int]}                 id productType id, int时返回单个Article对象
     *                                               array[int]时 返回  Article对象列表 key 是id
     * @return { null or productType(s)}            没找到数据时返回null, 找到时返回Article(s)
     */
    async get(idList) {
        const articles = await this.articleAdapter.get({
            idList
        }, Article);
        return articles;
    }


    /**
     * 文章详情页面
     * @author wangbinxiang
     * @date   2016-12-05T11:06:00+0800
     * @param  {[type]}                 idList [description]
     * @param  {[type]}                 userId [description]
     * @return {[type]}                        [description]
     */
    async detail(idList, userId) {
        const article = await this.articleAdapter.get({
            idList
        }, Article);
        console.log(article.status);
        if (article === null || !checkResourcesOwner(article, 'userId', userId, lodash.isArray(idList)) || article.status !== ARTICLE_STATUS_PUBLISH) {
            return null;
        } 
        return article;
    }


    /**
     * 添加文章
     * @author wangbinxiang
     * @date   2016-09-20T15:31:14+0800
     */
    async add(userId, title, content, categoryId) {
        return await this.articleAdapter.add({
            userId,
            title,
            content,
            categoryId
        }, Article);
    }

    /**
     * 编辑文章
     * @author wangbinxiang
     * @date   2016-09-20T15:31:29+0800
     * @return {[type]}                 [description]
     */
    async edit(id, title, content, categoryId) {
        return await this.articleAdapter.edit({
            id,
            title,
            content,
            categoryId
        }, Article);
    }

    /**
     * 删除文章
     * @author wangbinxiang
     * @date   2016-09-20T15:31:37+0800
     * @return {[type]}                 [description]
     */
    async del(id) {
        return await this.articleAdapter.del({
            id
        }, Article);
    }

    /**
     * [publish description]
     * @author wangbinxiang
     * @date   2016-12-02T00:15:19+0800
     * @param  {[type]}                 id [description]
     * @return {[type]}                    [description]
     */
    async publish(id) {
        return await this.articleAdapter.publish({
            id
        }, Article);
    }

    /**
     * [revert description]
     * @author wangbinxiang
     * @date   2016-12-02T00:15:23+0800
     * @param  {[type]}                 id [description]
     * @return {[type]}                    [description]
     */
    async revert(id) {
        return await this.articleAdapter.revert({
            id
        }, Article);
    }

}