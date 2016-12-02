import moment from 'moment';
import { randomInt } from '../../libs/helper';
import verificationCodeNameList from '../../config/verificationCodeConf';
import lodash from 'lodash';
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

    cleanData() {
        this.store[this.codeName] = null;
    }

    getData() {
        if (this.store[this.codeName]) {
            return this.store[this.codeName];
        };
        return null;
    }

    saveData(data) {
        const store = this.store[this.codeName]? this.store[this.codeName]: {};
        store[data.phoneNum] = data;
        this.store[this.codeName] = store;
    }

    //检查是否可以发送验证码
    //3个可发送手机限额
    //未满3个可继续发
    //满3格检查是否过期，过期可发，未过期不可发
    isCanSend(resetLimit) {
        const data = this.getData();

        if (data) {
            //检查该手机是否已发送过，并且未过期
            if (data[this.phoneNum] && this.timestamp - data[this.phoneNum]['timestamp'] < resetLimit) {
                return false;
            }

            const dataLength = lodash.keys(data).length;
            if (dataLength >= 3) {
                //检查是否有过期
                for(let key in data){
                    if (this.timestamp - data[key]['timestamp'] >= resetLimit) {
                        this.cleanData();
                        return true;
                    }
                }
                return false;
            } 
        }
        return true;
    }


    /**
     * 发送验证码
     * @author wangbinxiang
     * @date   2016-09-07T14:06:00+0800
     * @return {[type]}                 [description]
     */
    send(resetLimit = 60) {

        if (!this.isCanSend(resetLimit)) {
            const info = resetLimit + '秒内仅能获取一次短信验证码,请稍后重试';
            return { success: false, info };
        }



        //生成验证码
        const code = randomInt();

        //发送到手机
        sendPhone.send(this.phoneNum, code);

        const timestamp =  moment().unix();
        let phoneNum = this.phoneNum;
        
        const data = { code, timestamp , phoneNum };

        //验证码写入store
        this.saveData(data);
        
        return { success: true, info: "" };
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
        const data = this.getData();
        if (data && data[this.phoneNum] && data[this.phoneNum].code === parseInt(code)) {
            return true;
        }
        return false;
        //没有验证码返回错误, 验证码超时返回错误
        
        //检查验证码是否和传入的code相同

        //返回结果

    }
}
