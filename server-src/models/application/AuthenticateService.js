import UserAdapter from '../adapter/AuthenticateAdapter';
import User from '../model/User';
import VerificationCodeService from '../application/VerificationCodeService';

//用户认证服务类
export default class AuthenticateService {
    constructor() {
        this.userAdapter = new UserAdapter();
    }

    get(idList) {
        return this.userAdapter.get(idList, User);
    }

    //用户注册功能
    register(cellPhone, password, code, store) {
        const verificationCodeService = new VerificationCodeService(store, cellPhone);
        verificationCodeService.checkRegister(code);
        return this.userAdapter.signup(cellPhone, password, User);
    }

    //用户登录功能
    login(passport, password) {
        //用户适配器 
        return this.userAdapter.verification(passport, password, User);
    }

    updatePassword(id, oldPassword, password) {
        return this.userAdapter.updatePassword(id, oldPassword, password, User);
    }

    //获取用户
}