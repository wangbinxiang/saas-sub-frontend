import RequestAdapter from '../../libs/RequestAdapter';
import ContractTranslator from '../translator/ContractTranslator';
import ContractRequestJsonApi from '../request/ContractRequestJsonApi';
import {
    CONTRACT_GET
} from '../../config/apiFeatureConf';
import pageCLass from '../model/page';

/**
 * 产品分类适配器
 */
export default class ContractAdapter extends RequestAdapter {
    constructor() {
        super();
        this.translator = new ContractTranslator();
    }

    buildRequest(apiFeature, data) {
        this.requestObject = new ContractRequestJsonApi(apiFeature, data);
    }


    get({
        idList,
        filters,
        pages
    }, aContractClass) {
        this.buildRequest(CONTRACT_GET, {
            idList,
            filters,
            pages
        });

        //如果idList是数组 则需要数组形式的结果
        this.needArrayResult(idList)

        this.translator.pageClass = pageCLass;

        this.activeClass = aContractClass;

        return this.request();
    }
}