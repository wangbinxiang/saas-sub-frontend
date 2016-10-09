import RequestAdapter from '../../libs/RequestAdapter';
import UserTranslator from '../translator/UserTranslator';
import AuthenticateRequestJsonApi from '../request/AuthenticateRequestJsonApi';
import { USER_GET, USER_LOGIN, USER_SIGNUP, USER_UPDATE_PASSWORD, USER_REST_PASSWORD } from '../../config/apiFeatureConf';

export default class AuthenticateAdapter extends RequestAdapter {
    constructor() {
        super();
        this.translator = new UserTranslator();
    }

    buildRequest(apiFeature, data) {
        this.requestObject = new AuthenticateRequestJsonApi(apiFeature, data);
    }

    get(idList, aUserClass) {
        this.buildRequest(USER_GET, { idList });

        this.activeClass = aUserClass;

        return this.request();
    }

    signup(cellPhone, password, aUserClass) {
        this.buildRequest(USER_SIGNUP, { 
            cellPhone: cellPhone,
            password: password
        });

        this.activeClass = aUserClass;

        return this.request();
    }

    //验证用户 async函数
    verification(passport, password, aUserClass) {
        this.buildRequest(USER_LOGIN, { 
            cellPhone: passport,
            password: password
        });

        this.activeClass = aUserClass;

        return this.request();
    }



    updatePassword(id, oldPassword, password, aUserClass) {
        this.buildRequest(USER_UPDATE_PASSWORD, { 
            id: id,
            oldPassword: oldPassword,
            password: password
        });

        this.activeClass = aUserClass;

        return this.request();
    }
}