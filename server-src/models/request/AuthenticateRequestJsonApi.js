import BaseRequest from '../../libs/BaseRequest';
import { GET, POST, PUT } from '../../config/httpMethodConf';
import { USER_GET, USER_LOGIN, USER_SIGNUP, USER_UPDATE_PASSWORD, USER_REST_PASSWORD } from '../../config/apiFeatureConf';
import { saasApiServiceLocation } from '../../libs/ApiServiceLocation';
/**
 * users接口 jsonapi 数据类
 */
export default class AuthenticateRequestJsonApi extends BaseRequest {
    constructor(feature, originData) {
        const host = saasApiServiceLocation();
        super(host, feature, originData);
        this.dataType = 'users';
    }

    get() {
        let url = '/users/';

        let ids = this.originData.idList? this.originData.idList.join(): '';

        if (ids) {
            url = url + ids;

            this.url = url;

            this.method = GET;
        } else {
            throw new Error('empty idList');
        }
    }

    signup() {
        let url = '/users';
        this.url = url;

        this.method = POST;

        this.setSuccessCode(201);
        this.setParamsErrorCode(409);

        let attributes = {
            cellPhone: this.originData.cellPhone, 
            password: this.originData.password
        };

        this.buildData(attributes);

    }

    login() {
        let url = '/users/signIn';
        this.url = url;

        this.method = POST;

        let attributes = {
            cellPhone: this.originData.cellPhone, 
            password: this.originData.password
        };

        this.buildData(attributes);
    }

    updatePassword() {
        let url = '/users/' + this.originData.id + '/updatePassword';
        this.url = url;

        this.method = PUT;

        let attributes = {
            oldPassword: this.originData.oldPassword, 
            password: this.originData.password
        }

        this.buildData(attributes);
    }

    // usersRestPasswordPut() {

    // }

    buildFeature() {
        switch(this.feature) {
            case USER_GET:
                this.get();
                break;
            case USER_LOGIN:
                this.login();
                break;
            case USER_SIGNUP:
                this.signup();
                break;
            case USER_UPDATE_PASSWORD:
                this.updatePassword();
                break;
            default:
                throw new Error('Invalid feature method');
        }
    }
}

