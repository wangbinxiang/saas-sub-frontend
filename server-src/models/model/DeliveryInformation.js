export default class Category {
  constructor ({
    id = 0,
    consignee,
    phone,
    province,
    city,
    district,
    address,
    postalCode,
    status,
    createTime,
    updateTime,
    statusTime
  }) {
    this.id = id
    this.consignee = consignee
    this.phone = phone
    this.province = province
    this.city = city
    this.district = district
    this.address = address
    this.postalCode = postalCode
    this.status = status
    this.updateTime = updateTime
    this.createTime = createTime
    this.statusTime = statusTime
  }
}
