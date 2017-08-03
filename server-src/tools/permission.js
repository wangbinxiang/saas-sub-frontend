import lodash from 'lodash'
/**
 * 验证用户权限
 *
 * @export
 * @param {any} memberGroup
 * @param {any} permissionKey
 * @param {any} value
 */
export function verifyPermission (memberGroup, permissionKey, value) {
  // 用户组设置
  // 判断 purview内的permissionKey字段是否有value数据, 有数据就不能访问，没数据可以访问。
  return !(memberGroup && memberGroup.purview && memberGroup.purview[permissionKey] && lodash.isArray(memberGroup.purview[permissionKey]) && memberGroup.purview[permissionKey].indexOf(value) !== -1)
}
