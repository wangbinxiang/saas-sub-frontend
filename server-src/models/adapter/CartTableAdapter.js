import RequestAdapter from '../../libs/RequestAdapter';
import CartTableTranslator from '../translator/CartTableTranslator';
import CartTableRequestJsonApi from '../request/CartTableRequestJsonApi';
import pageCLass from '../model/page';
import {
    CART_TABLE_GET,
    CART_TABLE_ADD,
    CART_TABLE_EDIT,
    CART_TABLE_DEL
} from '../../config/apiFeatureConf';


export default class CartTableAdapter extends RequestAdapter {
    constructor() {
        super();
        this.translator = new CartTableTranslator();
    }

    buildRequest(apiFeature, data) {
        this.requestObject = new CartTableRequestJsonApi(apiFeature, data);
    }

    get({
        idList,
        filters,
        pages
    }, aCartTableClass) {
        this.buildRequest(CART_TABLE_GET, {
            idList,
            filters,
            pages
        });

        //如果idList是数组 则需要数组形式的结果
        this.needArrayResult(idList);

        this.translator.pageClass = pageCLass;

        this.activeClass = aCartTableClass;

        return this.request();
    }

    add({
        shopId,
        name,
    }, aCartTableClass) {
        this.buildRequest(CART_TABLE_ADD, {
            shopId,
            name
        });

        this.activeClass = aCartTableClass;

        return this.request();

    }

    edit({
        id,
        name
    }, aCartTableClass) {
        this.buildRequest(CART_TABLE_EDIT, {
            id,
            name
        });

        this.activeClass = aCartTableClass;

        return this.request();
    }

    del({
        id
    }, aCartTableClass) {
        this.buildRequest(CART_TABLE_DEL, {
            id
        });

        this.activeClass = aCartTableClass;

        return this.request();
    }
}