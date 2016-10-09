import TravelAgency from './TravelAgency';
import TravelWholesaler from './TravelWholesaler';
import TravelOperator from './TravelOperator';
import TravelPersonal from './TravelPersonal';
//额外信息配置
import { TRAVEL_AGENCY, TRAVEL_WHOLESALER, TRAVEL_OPERATOR, TRAVEL_PERSONAL } from '../../config/informationConf';
/**
 * 用户资料类
 */
export default class Information {
    construct({ id = 0, title = '', contactPeople = '', contactPeopleQQ = '', province = '', city = '', address = '', bankCardHolderName = '', bankCardNumber = '', bankCardCellphone = '', category = '', type = '', updateTime = '', createTime = '', statusTime = '', status = '', additionalInformation = {} }) {

        this.id                 = id;
        this.title              = title;
        this.contactPeople      = contactPeople;
        this.contactPeopleQQ    = contactPeopleQQ;
        this.province           = province;
        this.city               = city;
        this.address            = address;
        this.bankCardHolderName = bankCardHolderName;
        this.bankCardNumber     = bankCardNumber;
        this.bankCardCellphone  = bankCardCellphone;
        this.category           = category;
        this.type               = type;
        this.updateTime         = updateTime;
        this.createTime         = createTime;
        this.statusTime         = statusTime;
        this.status             = status;

        switch(category) {
            case TRAVEL_AGENCY:
                this.additionalInformation = new TravelAgency(additionalInformation);
                break;
            case TRAVEL_WHOLESALER:
                this.additionalInformation = new TravelWholesaler(additionalInformation);
                break;
            case TRAVEL_OPERATOR:
                this.additionalInformation = new TravelOperator(additionalInformation);
                break;
            case TRAVEL_PERSONAL:
                this.additionalInformation = new TravelPersonal(additionalInformation);
                break;
            default:
                throw new Error('Invalid Information.category');
        }
    }
}