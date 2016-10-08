import BaseRequest from '../../libs/BaseRequest';
import { GET, POST, PUT, DELETE } from '../../config/httpMethodConf';
import { notifyApiServiceLocation } from '../../libs/ApiServiceLocation';
import { SMS_REGISTER, SMS_REST_PASSWORD } from '../../config/apiFeatureConf';

export default class SmsRequestJsonApi extends BaseRequest {
    constructor(feature, originData) {
        const host = saasApiServiceLocation();
        super(host, feature, originData);
        this.dataType = 'sms';
    }


    register() {
        let url = '/sms/signUp/';

        let cellPhone = this.originData.cellPhone;

        if (cellPhone) {
            url = url + cellPhone;

            this.url = url;

            this.method = POST;

            this.setSuccessCode(204);
            this.setParamsErrorCode(403);

            let attributes = {
                message: this.originData.message
            }

            this.buildData(attributes);
        } else {
            throw new Error('error cellPhone');
        }
    }

    resetPassword() {
        let url = '/sms/resetPassword/'

        let cellPhone = this.originData.cellPhone;

        if (cellPhone) {
            url = url + cellPhone;

            this.url = url;

            this.method = POST;

            this.setSuccessCode(204);
            this.setParamsErrorCode(403);

            let attributes = {
                message: this.originData.message
            }

            this.buildData(attributes);
        } else {
            throw new Error('error cellPhone');
        }
    }

    buildFeature() {
        switch(this.feature) {
            case SMS_REGISTER:
                this.register();
                break;
            case SMS_REST_PASSWORD:
                this.resetPassword();
                break;
            default:
                throw new Error('Invalid feature method');
        }
    }
}