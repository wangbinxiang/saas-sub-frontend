import Translator from '../../libs/Translator';
import OrderJsonApiBodyReader from '../reader/OrderJsonApiBodyReader';

export default class OrderTranslator extends Translator {
    constructor() {
        super();
    }


    //翻译users信息
    // toObject(body, aActiveClass) {

    //     let page;
    //     let result;
    //     if (typeof body.links !== 'undefined') {
    //         page = this.createPage(body.links);
    //     }
    //     this.activeClass = aActiveClass;

    //     if (typeof body.length !== 'undefined') {
    //         result = {};
    //         for(let data of body) {
    //             let obj = this.createObject(data);
    //             result[obj.id] = obj;
    //         }
    //     } else {
    //         let obj = this.createObject(body);
    //         // if (this.isNeedArrayResult()) {
    //         //     result = { [obj.id] : obj };
    //         // } else {
    //             result = obj;
    //         // }
    //     }

    //     // if (page) {
    //     //     return { page, result };    
    //     // }

    //     return result;
    // }

    readData(data) {
        const bodyReader = new OrderJsonApiBodyReader(data);
        console.log(bodyReader.data);
        
        let id = bodyReader.value('id');
        let price = bodyReader.value('price');
        let payType = bodyReader.value('payType');
        let category = bodyReader.value('category');
        let payTime = bodyReader.value('payTime');
        let comment = bodyReader.value('comment');
        let freight = bodyReader.value('freight');
        let users = bodyReader.value('users');
        let shops = bodyReader.value('shops');
        let orderProducts = bodyReader.value('orderProducts');
        let updateTime = bodyReader.value('updateTime');
        let createTime = bodyReader.value('createTime');
        let statusTime = bodyReader.value('statusTime');
        let status = bodyReader.value('status');

        return {
            id,
            price,
            payType,
            category,
            payTime,
            comment,
            freight,
            users,
            shops,
            orderProducts,
            updateTime,
            createTime,
            statusTime,
            status
        };
    }
}