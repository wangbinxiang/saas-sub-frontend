import lodash from 'lodash'
import config from 'config'
import {
	encrypt,
    decrypt
} from './util'

/**
 * 获取子站点域名
 * @author wangbinxiang
 * @date   2017-02-27T17:05:41+0800
 * @param  {[type]}                 ctx [description]
 * @return {[type]}                     [description]
 */
export function getSubWebSiteHost(ctx) {
	//获取当前站点子站域名
    const customHost = lodash.findKey(config.get('hostMapping'), value => {
        return value === ctx._subId
    });

    return customHost? customHost: ctx._subId + '.sub.saaslocal.com'
}

//解密shopId
export function decryptShopid(enc) {
    const cryptKey = config.get('crypt.key.shopId')
    return decrypt(enc, cryptKey)
}

//加密shopId
export function encryptShopid(dec) {
    const cryptKey = config.get('crypt.key.shopId')
    return encrypt(dec, cryptKey)
}