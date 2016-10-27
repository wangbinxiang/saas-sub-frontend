import Translator from '../../libs/Translator';
import OrderJsonApiBodyReader from '../reader/OrderJsonApiBodyReader';

export default class OrderTranslator extends Translator {
    constructor() {
        super();
    }


    //翻译users信息
    toObject(body, aActiveClass) {

        let page;
        let result;
        if (typeof body.links !== 'undefined') {
            page = this.createPage(body.links);
        }
        this.activeClass = aActiveClass;

        if (typeof body.length !== 'undefined') {
            result = {};
            for(let data of body) {
                let obj = this.createObject(data);
                result[obj.id] = obj;
            }
        } else {
            let obj = this.createObject(body);
            // if (this.isNeedArrayResult()) {
            //     result = { [obj.id] : obj };
            // } else {
                result = obj;
            // }
        }

        // if (page) {
        //     return { page, result };    
        // }
        
        return result;
    }

    readData(data) {
        // const bodyReader = new OrderJsonApiBodyReader(data);

        // let id          = bodyReader.value('id');
        // let name        = bodyReader.value('name');
        // let category    = bodyReader.value('category');
        // let feature     = bodyReader.value('feature');
        // let logo        = bodyReader.value('logo');
        // let minPrice    = bodyReader.value('minPrice');
        // let maxPrice    = bodyReader.value('maxPrice');
        // let description = bodyReader.value('description');
        // let slides      = bodyReader.value('slides');
        // let prices      = bodyReader.value('prices');
        // let updateTime  = bodyReader.value('updateTime');
        // let createTime  = bodyReader.value('createTime');
        // let statusTime  = bodyReader.value('statusTime');
        // let status      = bodyReader.value('status');

        // let user        = bodyReader.value('users');
        // let productType = bodyReader.value('productTypes');
        
        let id;
        let status;
        let payType;
        let userId;
        let shopId;
        let price;
        let comment;
        let productList;

        if (data.order) {
            id = data.order.order_id;
            status = data.order.status;
            payType = data.order.pay_type;
            userId = data.order.user_id;
            shopId = data.order.shop_id;
            price = data.order.price;
            comment = data.order.comment;
            productList = data.productList;
        } else {
            id = data.order_id;
            status = data.status;
            payType = data.pay_type;
            userId = data.user_id;
            shopId = data.shop_id;
            price = data.price;
            comment = '';
            productList = {};
        }




        return { id, status, payType, userId, shopId, price, comment, productList };
    }
}