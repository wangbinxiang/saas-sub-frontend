import RequestAdapter from '../../libs/RequestAdapter';

export class SmsAdapter extends RequestAdapter {
    constructor() {
        super();
        this.translator = new UserTranslator();
    }

    buildRequest(apiFeature, data) {
        this.requestObject = new AuthenticateRequestJsonApi(apiFeature, data);
    }


    register(cellphone, message) {

    }

    resetPassword(cellphone, message) {
        
    }

}