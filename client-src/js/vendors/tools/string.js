import nl2br from 'nl2br'
import lodash from 'lodash'


//空格转nbsp
export function space2nbsp(string) {
    return string.replace(/ /g, '&nbsp;')
}


export function nbspbr(string){
    return nl2br(space2nbsp(string))
}


/**
 * 取消字符转义
 * 
 * @export
 * @param {any} data 
 * @param {any} key 
 */
export function unescapeData(data, key) {
    lodash.forEach(data, function(value) {
        value[key] = lodash.unescape(value[key])
        return value
    });
}
