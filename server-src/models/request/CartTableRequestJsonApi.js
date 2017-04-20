import BaseRequest from '../../libs/BaseRequest'
import {
    GET,
    POST,
    PUT,
    DELETE
} from '../../config/httpMethodConf'
import {
    shopApiServiceLocation
} from '../../libs/ApiServiceLocation'
import {
    jsonApiGetUrl
} from '../../libs/helper'
import {
    CART_TABLE_GET,
    CART_TABLE_ADD,
    CART_TABLE_EDIT,
    CART_TABLE_DEL
} from '../../config/apiFeatureConf'


export default class CartTableRequestJsonApi extends BaseRequest {
    constructor(feature, originData) {
        const host = shopApiServiceLocation();
        super(host, feature, originData);
        this.dataType = 'tables';
    }


    //获取餐桌信息
    get() {
        const baseUrl = '/catering/tables';

        const idList = this.originData.idList ? this.originData.idList : '';

        const filters = this.originData.filters ? this.originData.filters : '';

        const pages = this.originData.pages ? this.originData.pages : '';

        this.url = jsonApiGetUrl(baseUrl, idList, { filters, pages });

        this.method = GET;
    }


    add() {
        this.url = '/catering/tables'

        this.method = POST

        this.setSuccessCode(201)

        const attributes = {
            shopId: this.originData.shopId,
            name: this.originData.name
        }
        this.buildData(attributes)
    }


    edit() {
        this.url = '/catering/tables/' + this.originData.id;
        this.method = PUT;

        let attributes = {
            name: this.originData.name
        };

        this.buildData(attributes);
    }

    delete() {

        this.url = '/catering/tables/' + this.originData.id;
        this.method = DELETE;
    }


    buildFeature() {
        switch(this.feature) {
            case CART_TABLE_GET:
                this.get();
                break;
            case CART_TABLE_ADD:
                this.add();
                break;
            case CART_TABLE_EDIT:
                this.edit();
                break;
            case CART_TABLE_DEL:
                this.delete();
                break;
            default:
                throw new Error('Invalid feature method');
        }
    }
}
