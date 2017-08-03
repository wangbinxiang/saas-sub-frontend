/**
 * 前台用户组
 *
 * @export
 * @class MemberGroup
 */
export default class MemberGroup {
  constructor ({
    id,
    name,
    category,
    status,
    purview,
    createTime,
    updateTime,
    statusTime,
    shop
  }) {
    this.id = id
    this.name = name
    this.category = category
    this.purview = purview
    this.createTime = createTime
    this.updateTime = updateTime
    this.statusTime = statusTime
    this.status = status
    this.shopId = shop
  }
}
