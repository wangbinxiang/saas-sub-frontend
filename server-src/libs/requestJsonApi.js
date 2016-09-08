import request from 'request-json';
import Promise from 'bluebird';

/**
 * jsonApi promise 请求类
 * @author 王斌翔
 */
class RequestJsonApi {
    constructor(host) {
        //初始化请求地址
        this.client = request.createClient(host);
    }

    promiseThunk(resolve, reject) {
        return (err, res, body) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    res,
                    body
                });
            }
        }
    }

    get(url) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.client.get(url, that.promiseThunk(resolve, reject));
        });
    }

    post(url, data) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.client.post(url, data, that.promiseThunk(resolve, reject));
        });
    }

    put(url, data) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.client.put(url, data, that.promiseThunk(resolve, reject));
        });
    }

    del(url, data) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.client.del(url, data, that.promiseThunk(resolve, reject));
        });
    }
}

export default RequestJsonApi;