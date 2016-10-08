import BaseRequest from '../../libs/BaseRequest';
import { GET, POST, PUT, DELETE } from '../../config/httpMethodConf';
import { saasApiServiceLocation } from '../../libs/ApiServiceLocation';
import { INFORMATION_APPLY, INFORMATION_GET, INFORMATION_EDIT, INFORMATION_DECLINE, INFORMATION_APPROVE } from '../../config/apiFeatureConf';

export default class ApplicationRequestJsonApi extends BaseRequest {
    constructor(feature, originData) {
        const host = saasApiServiceLocation();
        super(host, feature, originData);
        this.dataType = 'applications';
    }

    get() {
        let url = '/applications/';
        let ids = this.originData.idList? this.originData.idList.join(): '';

        if (ids) {
            url = url + ids;

            this.url = url;

            this.method = GET;
        } else {
            throw new Error('empty idList');
        }
    }

    apply() {
        let url     = '/applications';
        this.url    = url;
        this.method = POST;
        let attributes = {
            type: this.originData.type,
            category: this.originData.category,
            id: this.originData.id,
            title: this.originData.title,
            contactPeople: this.originData.contactPeople,
            contactPeoplePhone: this.originData.contactPeoplePhone,
            contactPeopleQQ: this.originData.contactPeopleQQ,
            province: this.originData.province,
            city: this.originData.city,
            address: this.originData.address,
            identifyCardFrontPhoto: this.originData.identifyCardFrontPhoto,
            identifyCardBackPhoto: this.originData.identifyCardBackPhoto,
            bankCardHolderName: this.originData.bankCardHolderName,
            bankCardNumber: this.originData.bankCardNumber,
            bankCardCellphone: this.originData.bankCardCellphone,
            additionalInformation: this.originData.additionalInformation
        };
       

        // this.successCode     = 201;
        // this.paramsErrorCode = 409;
        this.buildData(attributes);
    }

    edit() {
        let url     = '/applications';
        this.url    = url;
        this.method = PUT;

        let attributes = {
            type: this.originData.type,
            category: this.originData.category,
            id: this.originData.id,
            title: this.originData.title,
            contactPeople: this.originData.contactPeople,
            contactPeoplePhone: this.originData.contactPeoplePhone,
            contactPeopleQQ: this.originData.contactPeopleQQ,
            province: this.originData.province,
            city: this.originData.city,
            address: this.originData.address,
            identifyCardFrontPhoto: this.originData.identifyCardFrontPhoto,
            identifyCardBackPhoto: this.originData.identifyCardBackPhoto,
            bankCardHolderName: this.originData.bankCardHolderName,
            bankCardNumber: this.originData.bankCardNumber,
            bankCardCellphone: this.originData.bankCardCellphone,
            additionalInformation: this.originData.additionalInformation
        };

        this.buildData(attributes);
    }

    decline() {
        let url = '/applications/decline/';
        let id = Number.isInteger(this.originData.id)? this.originData.id: '';

        if (id) {
            this.url = url + id;
            this.method = PUT;
        } else {
            throw new Error('error id');
        }

    }

    approve() {
        let url = '/applications/approve/';
        let id = Number.isInteger(this.originData.id)? this.originData.id: '';

        if (id) {
            this.url = url + id;
            this.method = PUT;
        } else {
            throw new Error('error id');
        }
    }



    buildFeature() {
        switch(this.feature) {
            case INFORMATION_APPLY:
                this.apply();
                break;
            case INFORMATION_GET:
                this.get();
                break;
            case INFORMATION_EDIT:
                this.edit();
                break;
            case INFORMATION_DECLINE:
                this.decline();
                break;
            case INFORMATION_APPROVE:
                this.approve();
                break;
            default:
                throw new Error('Invalid http method');
        }
    }


}