import RequestAdapter from '../../libs/RequestAdapter';
import ArticleTranslator from '../translator/ArticleTranslator';
import ArticleRequestJsonApi from '../request/ArticleRequestJsonApi';
import {
    ARTICLE_GET,
    ARTICLE_ADD,
    ARTICLE_EDIT,
    ARTICLE_DEL,
    ARTICLE_REVERT,
    ARTICLE_PUBLISH
} from '../../config/apiFeatureConf';
import pageCLass from '../model/page';

/**
 * 产品分类适配器
 */
export default class ArticleAdapter extends RequestAdapter {
    constructor() {
        super();
        this.translator = new ArticleTranslator();
    }

    buildRequest(apiFeature, data) {
        this.requestObject = new ArticleRequestJsonApi(apiFeature, data);
    }


    get({
        idList,
        filters,
        pages,
        sort
    }, aArticleClass) {
        this.buildRequest(ARTICLE_GET, {
            idList,
            filters,
            pages,
            sort
        });

        //如果idList是数组 则需要数组形式的结果
        this.needArrayResult(idList)

        this.translator.pageClass = pageCLass;

        this.activeClass = aArticleClass;

        return this.request();
    }

    add({
        userId,
        title,
        content,
        categoryId
    }, aArticleClass) {
        this.buildRequest(ARTICLE_ADD, {
            userId,
            title,
            content,
            categoryId
        });

        this.activeClass = aArticleClass;

        return this.request();

    }

    edit({
        id,
        title,
        content,
        categoryId
    }, aArticleClass) {
        this.buildRequest(ARTICLE_EDIT, {
            id,
            title,
            content,
            categoryId
        });

        this.activeClass = aArticleClass;

        return this.request();
    }

    del({
        id
    }, aArticleClass) {
        this.buildRequest(ARTICLE_DEL, {
            id
        });

        this.activeClass = aArticleClass;

        return this.request();
    }

    publish({
        id
    }, aArticleClass) {
        this.buildRequest(ARTICLE_PUBLISH, {
            id
        });

        this.activeClass = aArticleClass;

        return this.request();
    }

    revert({
        id
    }, aArticleClass) {
        this.buildRequest(ARTICLE_REVERT, {
            id
        });

        this.activeClass = aArticleClass;

        return this.request();
    }
}