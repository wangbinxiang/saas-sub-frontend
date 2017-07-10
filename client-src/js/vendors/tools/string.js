import nl2br from 'nl2br'
import lodash from 'lodash'

// 空格转nbsp
export function space2nbsp (string) {
  return string.replace(/ /g, '&nbsp;')
}

export function nbspbr (string) {
  return nl2br(space2nbsp(string))
}

/**
 * 取消字符转义
 *
 * @export
 * @param {array} data
 * @param {string or array} key
 */
export function unescapeData (data, key) {
  lodash.forEach(data, function (value) {
    if (lodash.isString(key)) {
      value[key] = lodash.unescape(value[key])
    } else if (lodash.isArray(key)) {
      for (let k of key) {
        value[k] = lodash.unescape(value[k])
      }
    }
    return value
  })
}
// 右curry化
export const unescapeDataCurryRight = lodash.curryRight(unescapeData)
