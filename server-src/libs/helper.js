import _ from 'lodash';
import moment from 'moment';
import config from 'config';

/**
 * 生成随机整数
 * @author wangbinxiang
 * @date   2016-09-07T01:33:04+0800
 * @param  {Number}                 low  [description]
 * @param  {Number}                 high [description]
 * @return {[type]}                      [description]
 */
export function randomInt(low = 100000, high = 999999) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}


/**
 * 生成随机字符串
 * @param  {Number} len 要生成的长度
 * @return {String} pwd 生成的随机字符串
 */
export function randomString(len) {
    len = len || 5
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const maxPos = chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
}

/**
 * 上传文件设置
 * @type {Object}
 */
import path from 'path'
import multer from 'koa-multer'

export const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        const {
            name,
            ext
        } = path.parse(file.originalname)
        cb(null, `${name}-${randomString(2)}-${ext}`)
    }
})


/**
 * idList转换成ids； idlist 格式1: [1,2,3]; 格式2: 123; ids结果 格式1: 1,2,3; 格式2: 123;
 * @author wangbinxiang
 * @date   2016-09-23T12:16:10+0800
 * @param  {array or int}                 idList 数字数组或者数字id
 * @return {err, string}                       err  null or Error('error params idList')
 *                                        ids  格式1: 1,2,3; 格式2: 123;
 */
export function buildJsonApiIdsUrl(idList) {
    let idString = undefined;
    if (_.isArray(idList)) {
        idString = idList.join();
    } else if (_.isInteger(parseInt(idList))) {
        idString = idList.toString();
    }

    return idString;
}

/**
 * 将搜索条件转为 Json api url 搜索参数
 * @author wangbinxiangurl
 * @date   2016-09-23T17:18:43+0800
 * @param  { object }                 filters [description]
 * @return {[string]}                         json api url 搜索参数
 */
export function buildJsonApiQueryUrl(filters, pages, sort) {
    let url = '';
    let urlList = [];
    if (_.isPlainObject(filters) && Object.keys(filters).length > 0) {
        for (let i in filters) {
            urlList.push('filter[' + i + ']=' + filters[i]);
        }
    }
    if (_.isPlainObject(pages) && Object.keys(pages).length > 0) {
        for (let i in pages) {
            urlList.push('page[' + i + ']=' + pages[i]);
        }
    }

    if (sort) {
        urlList.push('sort=' + sort);
    }

    if (urlList.length > 0) {
        url = '?' + urlList.join('&');
    }

    return url;
}

export function buildJsonApiGetUrl(baseUrl, idsUrl, queryUrl) {
    let url = baseUrl;
    if (_.isString(idsUrl) && idsUrl !== '') {
        url += '/' +  idsUrl;
    }

    if (_.isString(queryUrl) && queryUrl !== '') {
        url += queryUrl;
    }
    return url;
}


export function jsonApiGetUrl(baseUrl, idList, { filters, pages, sort }) {

    let idsUrl = buildJsonApiIdsUrl(idList);

    let queryUrl = buildJsonApiQueryUrl(filters, pages, sort);

    return buildJsonApiGetUrl(baseUrl, idsUrl, queryUrl);
}

/**
 * 检查资源是否是该拥有者的
 * @author wangbinxiang
 * @date   2016-10-26T13:25:21+0800
 * @param  { object }                 resources   资源
 * @param  { string }                 checkTarget 检查目标
 * @param  { int }                 owner       拥有者数据
 * @param  { bool }                isList      是否是数据列表
 * @return { bool }                            返回是否是该拥有者的
 */
export function checkResourcesOwner(resources, checkTarget, owner, isList) {
    if (isList) {
        for(let i in resources) {
            if (resources[i][checkTarget] !== owner) {
                return false;
            }
        }
        return true;
    } else {
        return resources[checkTarget] === owner;
    }
}

export function checkOther(id, shopId){
    const other = config.get('productMapping.' + shopId);
    let live = false
    if (other) {
        for(let i in other) {
            if (_.indexOf(other[i], +id) > -1) {
                live = true;
            }
        }
    }
    console.log(live);
    return live;
}


export function timestampToDate(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment.unix(timestamp).utc().utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
}
