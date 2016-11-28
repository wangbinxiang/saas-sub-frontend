import VerificationCode from '../model/VerificationCode';
import {
    REGISTER_CODE,
    BIND_CELLPHONE_CODE
} from '../../config/verificationCodeConf';

export default class VerificationCodeService {
    constructor(store) {
        this.store = store;
    }

    buildVerificationCode(phoneNum, codeName) {
        return new VerificationCode(phoneNum, codeName, this.store);
    }

    sendBind(phoneNum) {
        const resetLimit = 60;
        const verificationCode = this.buildVerificationCode(phoneNum, BIND_CELLPHONE_CODE);
        return verificationCode.send(resetLimit);
    }

    checkBind(phoneNum, code) {
        const verificationCode = this.buildVerificationCode(phoneNum, BIND_CELLPHONE_CODE);
        return verificationCode.check(code);      
    }



    //注册发送验证码
    sendSignup(phoneNum) {
        const resetLimit = 60;
        const verificationCode = this.buildVerificationCode(phoneNum, REGISTER_CODE);
        return verificationCode.send(resetLimit);
    }

    //注册验证验证码
    checkSignup(phoneNum, code) {
        const verificationCode = this.buildVerificationCode(phoneNum, REGISTER_CODE);
        return verificationCode.check(code);
    }

}

//发送验证码 手机号 验证码名称