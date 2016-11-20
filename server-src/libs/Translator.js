import JsonApiBodyLinksReader from './JsonApiBodyLinksReader';

export default class Translator {
    constructor() {
        this.arrayResult = false;
    }

    newObject(params) {
        return new this.activeClass(params);
    }

    //翻译users信息
    toObject(body, aActiveClass) {

        let page;
        let result;

        if (typeof body.links !== 'undefined') {
            page = this.createPage(body.links);
        }
        this.activeClass = aActiveClass;
        if (typeof body.data.length !== 'undefined') {
            result = [];
            for(let data of body.data) {
                let obj = this.createObject(data, body.included);
                result.push(obj);
            }

        } else {
            let obj = this.createObject(body.data, body.included);
            if (this.isNeedArrayResult()) {
                result = [];
                result.push(obj);
            } else {
                result = obj;
            }
        }

        if (page) {
            return { page, result };    
        }
        return result;
    }


    /**
     * 创建对象
     * @author wangbinxiang
     * @date   2016-09-13T14:58:34+0800
     * @param  {[type]}                 data [description]
     * @return {[type]}                      [description]
     */
    createObject(data, included) {
        let param = this.readData(data, included);
        return this.newObject(param);
    }


    createPage(links) {
        let params = this.readPageData(links);
        return this.newPage(params)
    }

    newPage(params) {
        return new this.pageClass(params);
    }


    /**
     * 子类需要实现该方法读取数据
     * @author wangbinxiang
     * @date   2016-09-13T14:36:17+0800
     * @param  {[type]}                 data [description]
     * @return {[type]}                      [description]
     */
    readData(data, included){}

    readPageData(links){
        const bodyLinksReader = new JsonApiBodyLinksReader(links);
        let first = bodyLinksReader.value('first');
        let last = bodyLinksReader.value('last');
        let prev = bodyLinksReader.value('prev');
        let next = bodyLinksReader.value('next');

        return { first, last, prev, next };
    }

    /**
     * 是否需要数组列表结果
     * @author wangbinxiang
     * @date   2016-09-29T21:11:15+0800
     * @return {Boolean}                [description]
     */
    isNeedArrayResult() {
        if (this.arrayResult) {
            return true
        }
        return false
    }

    needArrayResult() {
        this.arrayResult = true;
    }

    /**
     * get pageClass 方法
     * @author wangbinxiang
     * @date   2016-09-28T22:31:59+0800
     * @return {object}                 返回pageClass
     */
    get pageClass() {
        return this._pageClass;
    }

    /**
     * set pageClass 方法
     * @author wangbinxiang
     * @date   2016-09-28T22:32:40+0800
     * @param  {class}                 aPageClass 一个分页类
     */
    set pageClass(aPageClass) {
        this._pageClass = aPageClass;
    }


    set arrayResult(value) {
        this._arrayResult = value;
    }

    get arrayResult() {
        return this._arrayResult;
    }
}