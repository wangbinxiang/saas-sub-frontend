import RequestAdapter from '../../libs/RequestAdapter';
import ProductTypeTranslator from '../translator/ProductTypeTranslator';
import ProductTypeRequestJsonApi from '../request/ProductTypeRequestJsonApi';
import {
    PRODUCT_TYPE_GET,
    PRODUCT_TYPE_ADD,
    PRODUCT_TYPE_EDIT,
    PRODUCT_TYPE_DEL
} from '../../config/apiFeatureConf';
import pageCLass from '../model/page';

/**
 * 产品分类适配器
 */
export default class ProductTypeAdapter extends RequestAdapter {
    constructor() {
        super();
        this.translator = new ProductTypeTranslator();
    }

    buildRequest(apiFeature, data) {
        this.requestObject = new ProductTypeRequestJsonApi(apiFeature, data);
    }


    get({
        idList,
        filters,
        pages
    }, aProductTypeClass) {
        this.buildRequest(PRODUCT_TYPE_GET, {
            idList,
            filters,
            pages
        });

        //如果idList是数组 则需要数组形式的结果
        this.needArrayResult(idList)

        this.translator.pageClass = pageCLass;

        this.activeClass = aProductTypeClass;

        return this.request();
    }

    add({
        userId,
        name,
        category
    }, aProductTypeClass) {
        this.buildRequest(PRODUCT_TYPE_ADD, {
            userId,
            name,
            category
        });

        this.activeClass = aProductTypeClass;

        return this.request();

    }

    edit({
        id,
        name,
        category
    }, aProductTypeClass) {
        this.buildRequest(PRODUCT_TYPE_EDIT, {
            id,
            name,
            category
        });

        this.activeClass = aProductTypeClass;

        return this.request();
    }

    del({
        id
    }, aProductTypeClass) {
        this.buildRequest(PRODUCT_TYPE_DEL, {
            id
        });

        this.activeClass = aProductTypeClass;

        return this.request();
    }
}