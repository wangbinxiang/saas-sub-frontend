import moment from 'moment';
import { randomInt } from '../../libs/helper';
import verificationCodeNameList from '../../config/verificationCodeConf';
import VerificationCodeError from '../error/VerificationCodeError';
/**
 * 假发送手机验证码api
 * @type {Object}
 */
const sendPhone = {
    send: (phoneNum, code) => {}
}


export default class VerificationCode {
    constructor(phoneNum, codeName, store) {
        this.phoneNum  = phoneNum;
        this.codeName  = verificationCodeNameList[codeName];
        this.store     = store;
        this.timestamp =  moment().unix();
    }

    getPhoneNum() {
        return this.phoneNum;
    }

    getCodeName() {
        return this.codeName;
    }

    getStore() {
        return this.store;
    }

    getTimestamp() {
        return this.timestamp;
    }

    getData() {
        if (this.codeName) {
            if (this.store.verificationCode) {
                return this.store.verificationCode[this.codeName];    
            };
        };
        return undefined;
    }

    saveData(data) {
        if (typeof this.store.verificationCode === 'undefined') {
            this.store.verificationCode = {};
        };
        this.store.verificationCode[this.codeName] = data;

    }


    /**
     * 发送验证码
     * @author wangbinxiang
     * @date   2016-09-07T14:06:00+0800
     * @return {[type]}                 [description]
     */
    async send(interval = 60) {


        if (!this.expired(interval)) {
            //验证码未过期
            throw new VerificationCodeError('not expired');
        };

        //生成验证码
        const code = randomInt();

        //发送到手机
        await sendPhone.send(this.phoneNum, code);

        const timestamp = moment().unix();
        let phoneNum    = this.getPhoneNum();
        
        let data = { code, timestamp, phoneNum };
        //验证码写入store
        this.saveData(data);
    }
    /**
     * 检查验证码是否过期
     * @author wangbinxiang
     * @date   2016-09-16T15:40:11+0800
     * @param  {[type]}                 interval [description]
     * @return {[type]}                          [description]
     */
    expired(interval) {
        let data = this.getData();
        let expired = true;
        if (typeof data === 'object') {
            //检查发送间隔是否未过60秒
            if (this.timestamp - data['timestamp'] <= interval) {
                expired = false;
            }
        }
        return expired;
    }

    /**
     * 检查验证码
     * @author wangbinxiang
     * @date   2016-09-07T14:11:13+0800
     * @param  {[type]}                 code [description]
     * @return {[type]}                      [description]
     */
    check(code) {
        //从store获取验证码
        let data = this.getData();
        //没有验证码返回错误, 验证码超时返回错误

        //检查验证码是否和传入的code相同
        if(!this.verificationCode(code, data)) {
            throw new VerificationCodeError('wrong code')
        }
        //返回结果

    }

    verificationCode(code, data) {
        if (typeof data == 'undefined') {
            return false;
        };
        //data = { code, timestamp , phoneNum };
        if (this.phoneNum !== data.phoneNum) {
            return false;
        }
        if (parseInt(code) !== data.code) {
            return false;
        }
        return true;
    }



}
