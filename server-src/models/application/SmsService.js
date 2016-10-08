import SmsAdapter from '../adapter/SmsAdapter';
import Sms from '../model/Sms';

export default class SmsService {
    constructor() {
        this.smsAdapter = new SmsAdapter();
    }

    register(cellphone, message) {
        this.smsAdapter.register(cellphone, message);
    }


    resetPassword(cellphone, message) {
        this.smsAdapter.resetPassword(cellphone, message);   
    }



}