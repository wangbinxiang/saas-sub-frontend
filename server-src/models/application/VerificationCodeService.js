import VerificationCode from '../model/VerificationCode';
import { REGISTER_CODE } from '../../config/verificationCodeConf';

export default class VerificationCodeService {
    constructor(store, cellPhone) {
        this.store     = store;
        this.cellPhone = cellPhone;
    }

    buildVerificationCode(codeName){
        return new VerificationCode(this.cellPhone, codeName, this.store);
    }

    //注册发送验证码
    sendRegister() {
        const verificationCode = this.buildVerificationCode(REGISTER_CODE);
        return verificationCode.send();
    }

    //注册验证验证码
    checkRegister(code) {
        const verificationCode = this.buildVerificationCode(REGISTER_CODE);
        return verificationCode.check(code);
    }

}

    //发送验证码 手机号 验证码名称
    
    

