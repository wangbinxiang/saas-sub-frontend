import { TRAVEL_AGENCY, TRAVEL_WHOLESALER, TRAVEL_OPERATOR, TRAVEL_PERSONAL } from '../../config/informationConf';

export default class InformationRequestBodyReader {
    constructor(requestBody) {
        this.requestBody = requestBody;
        //个人信息
        this.personalData = {};
        //银行信息
        this.bankData = {};
        //行业信息
        this.additionalInformation = {};
    }

    getData() {
        let data = {};

        this.getPersonalData();
        this.getBankData();
        this.getAdditionalInformation();

        data = Object.assign(this.personalData, this.bankData);
        data.additionalInformation = this.additionalInformation;

        return data;
    }

    getPersonalData() {
        // requestBody.category;
        // requestBody.title;
        // requestBody.contactPeople;
        // requestBody.contactPeoplePhone;
        // requestBody.contactPeopleQQ;
        // requestBody.province;
        // requestBody.city;
        // requestBody.address;
        // requestBody.identifyCardFrontPhoto;
        // requestBody.identifyCardBackPhoto;

        this.personalData = {
            category: this.requestBody.category,
            title: this.requestBody.title,
            contactPeople: this.requestBody.contactPeople,
            contactPeoplePhone: this.requestBody.contactPeoplePhone,
            contactPeopleQQ: this.requestBody.contactPeopleQQ,
            province: this.requestBody.province,
            city: this.requestBody.city,
            address: this.requestBody.address,
            identifyCardFrontPhoto: this.requestBody.identifyCardFrontPhoto,
            identifyCardBackPhoto: this.requestBody.identifyCardBackPhoto
        }

    }

    /**
     * 获取银行信息
     * @author wangbinxiang
     * @date   2016-09-14T15:54:04+0800
     * @return {[type]}                 [description]
     */
    getBankData() {
        // requestBody.bankCardHolderName;
        // requestBody.bankCardNumber;
        // requestBody.bankCardCellphone;

        this.bankData = {
            bankCardHolderName: this.requestBody.bankCardHolderName,
            bankCardNumber: this.requestBody.bankCardNumber,
            bankCardCellphone: this.requestBody.bankCardCellphone
        }
    }



    getAdditionalInformation() {
        switch(parseInt(this.personalData.category)) {
            case TRAVEL_AGENCY:
                this.getTravelAgencyData();
                this.additionalInformation = this.travelAgencyData;
                break;
            case TRAVEL_WHOLESALER:
                this.getTravelWholesalerData();
                this.additionalInformation = this.travelWholesalerData;
                break;
            case TRAVEL_OPERATOR:
                this.getTravelOpeatorData();
                this.additionalInformation = this.travelOpeatorData
                break;
            case TRAVEL_PERSONAL:
                this.travelPersonalData();
                this.additionalInformation = this.travelPersonalData;
                break;
            default:
                throw new Error('Invalid Information.category');
        }
    }

    /**
     * 获取组团社行业信息
     * @author wangbinxiang
     * @date   2016-09-14T15:53:50+0800
     * @return {[type]}                 [description]
     */
    getTravelAgencyData() {
        this.travelAgencyData = this.getTravelCompanyData();
    }

    /**
     * 获取批发商行业信息
     * @author wangbinxiang
     * @date   2016-09-14T15:53:34+0800
     * @return {[type]}                 [description]
     */
    getTravelWholesalerData() {
        this.travelWholesalerData = this.getTravelCompanyData();
    }

    /**
     * 获取地接社行业信息
     * @author wangbinxiang
     * @date   2016-09-14T15:53:18+0800
     * @return {[type]}                 [description]
     */
    getTravelOpeatorData() {
        this.travelOpeatorData = this.getTravelCompanyData();
    }

    /**
     * 获取
     */
    getTravelCompanyData() {
        // this.requestBody.authorizePhoto;
        // this.requestBody.registrationPhoto;
        // this.requestBody.businessLicensePhoto;

        return {
            authorizePhoto: this.requestBody.authorizePhoto,
            registrationPhoto: this.requestBody.registrationPhoto,
            businessLicensePhoto: this.requestBody.businessLicensePhoto,
        }
    }


    /**
     * 获取个人导游行业信息
     * @author wangbinxiang
     * @date   2016-09-14T15:53:01+0800
     * @return {[type]}                 [description]
     */
    getTravelPersonalData() {
        // this.requestBody.touristGuideCardPhoto;

        this.travelPersonalData = {
            touristGuideCardPhoto: this.requestBody.touristGuideCardPhoto
        }
    }

}