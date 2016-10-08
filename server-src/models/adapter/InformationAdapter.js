import RequestAdapter from '../../libs/RequestAdapter';
import ApplicationRequestJsonApi from '../request/ApplicationRequestJsonApi';
import InformationTranslator from '../translator/InformationTranslator';
import { INFORMATION_APPLY, INFORMATION_GET, INFORMATION_EDIT, INFORMATION_DECLINE, INFORMATION_APPROVE } from '../../config/apiFeatureConf';


export default class InformationAdapter extends RequestAdapter {
    constructor() {
        super();
        this.translator = new InformationTranslator();
    }

    buildRequest(apiFeature, data) {
        this.requestObject = new ApplicationRequestJsonApi(apiFeature, data);
    }

    get(idList, aInformationClass) {
        this.buildRequest(INFORMATION_GET, { idList });

        this.activeClass = aInformationClass;

        return this.request();
    }


    /**
     * 申请认证
     * @author wangbinxiang
     * @date   2016-09-14T12:12:04+0800
     * @param  {[type]}                 options.type                   [description]
     * @param  {[type]}                 options.category               [description]
     * @param  {[type]}                 options.id                     [description]
     * @param  {[type]}                 options.title                  [description]
     * @param  {[type]}                 options.contactPeople          [description]
     * @param  {[type]}                 options.contactPeoplePhone     [description]
     * @param  {[type]}                 options.contactPeopleQQ        [description]
     * @param  {[type]}                 options.province               [description]
     * @param  {[type]}                 options.city                   [description]
     * @param  {[type]}                 options.address                [description]
     * @param  {[type]}                 options.identifyCardFrontPhoto [description]
     * @param  {[type]}                 options.identifyCardBackPhoto  [description]
     * @param  {[type]}                 options.bankCardHolderName     [description]
     * @param  {[type]}                 options.bankCardNumber         [description]
     * @param  {[type]}                 options.bankCardCellphone      [description]
     * @param  {[type]}                 options.additionalInformation  [description]
     * @param  {[type]}                 aInformationClass              [description]
     * @return {[type]}                                                [description]
     */
    apply({ type, category, id, title, contactPeople, contactPeoplePhone, contactPeopleQQ, province, city, address, identifyCardFrontPhoto, identifyCardBackPhoto, bankCardHolderName, bankCardNumber, bankCardCellphone, additionalInformation }, aInformationClass) {

        this.buildRequest(
            INFORMATION_APPLY,
            { type, category, id, title, contactPeople, contactPeoplePhone, contactPeopleQQ, province, city, address, identifyCardFrontPhoto, identifyCardBackPhoto, bankCardHolderName, bankCardNumber, bankCardCellphone, additionalInformation }
        );
        this.activeClass = aInformationClass;
        return this.request();
    }

    edit({ type, category, id, title, contactPeople, contactPeoplePhone, contactPeopleQQ, province, city, address, identifyCardFrontPhoto, identifyCardBackPhoto, bankCardHolderName, bankCardNumber, bankCardCellphone, additionalInformation }, aInformationClass) {

        this.buildRequest(
            INFORMATION_EDIT,
            { type, category, id, title, contactPeople, contactPeoplePhone, contactPeopleQQ, province, city, address, identifyCardFrontPhoto, identifyCardBackPhoto, bankCardHolderName, bankCardNumber, bankCardCellphone, additionalInformation }
        );

        this.activeClass = aInformationClass;
        return this.request();
    }

    decline(id, aInformationClass) {
        this.buildRequest(INFORMATION_DECLINE, { id });
        this.activeClass = aInformationClass;
        return this.request();
    }

    approve(id, aInformationClass) {
        this.buildRequest(INFORMATION_APPROVE, { id });
        this.activeClass = aInformationClass;
        return this.request();
    }
}