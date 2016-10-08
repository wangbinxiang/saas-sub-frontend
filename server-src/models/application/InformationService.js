import InformationAdapter from '../adapter/InformationAdapter';
import Information from '../model/Information';
import InformationRequestBodyReader from '../reader/InformationRequestBodyReader';
import {
    CATEGORY_TRAVEL
} from '../../config/informationConf';



//用户资料服务
export default class InformationService {
    constructor() {
        this.adapter = new InformationAdapter();
    }

    //资料申请审核
    apply(id, requestBody) {

        const informationRequestBodyReader = new InformationRequestBodyReader(requestBody);
        let data = informationRequestBodyReader.getData();
        //暂时只有
        data.type = CATEGORY_TRAVEL;
        data.id = id;


        return this.adapter.apply(data, Information);
    }


    get(idList) {
        this.adapter.get(idList, Information);
    }

    edit(id, requestBody) {
        const informationRequestBodyReader = new InformationRequestBodyReader(requestBody);
        let data = informationRequestBodyReader.getData();
        //暂时只有
        data.type = CATEGORY_TRAVEL;
        data.id = id;

        return this.adapter.edit(data, Information);
    }


    decline(id) {
        return this.adapter.decline(id, Information);
    }

    approve(id) {
        return this.adapter.approve(id, Information);
    }
}