import RequestJsonApiParamsError from './error/RequestJsonApiParamsError';

/**
 * 适配模式基类
 */
export default class RequestAdapter {
    /**
     * 请求远程api
     * @author wangbinxiang
     * @date   2016-09-27T16:55:13+0800
     * @return {[type]}                 [description]
     */
    async request() {
        let result = null;

        const { header, body } = await this.requestObject.request();
        console.log(body);
        if (header.statusCode === this.requestObject.getSuccessCode()) {
            result = this.translator.toObject(body, this.activeClass);
        } else if (header.statusCode === this.requestObject.noContentCode) {
            result = null;
        } else if (header.statusCode === this.requestObject.getParamsErrorCode()) {
            throw new RequestJsonApiParamsError('request JsonApi no params Error');
        } else {
            throw new Error('Invalid status');
        }

        return result;
    }

    //如果idList是数组 则需要数组形式的结果
    needArrayResult(idList) {
        if (idList && idList instanceof Array) {
            this.translator.needArrayResult();
        }
    }
}