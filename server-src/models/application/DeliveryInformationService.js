import DeliveryInfomationAdapter from '../adapter/DeliveryInfomationAdapter'
import DeliveryInfomation from '../model/DeliveryInfomation'
/**
 * 产品分类service类
 */
export default class DeliveryInfomationService {
  constructor () {
    this.deliveryInfomationAdapter = new DeliveryInfomationAdapter()
  }

  async index (idList, filters, pages) {
    let result = await this.deliveryInfomationAdapter.get({
      idList,
      filters,
      pages
    }, DeliveryInfomation)

    if (result == null) {
      return result
    }

    let { page, result: deliveryInfomations } = result

    return { page, deliveryInfomations }
  }

  async get (id) {
    let deliveryInfomations = await this.deliveryInfomationAdapter.get({
      idList: id
    }, DeliveryInfomation)
    return deliveryInfomations
  }

  async add (userId, consignee, phone, province, city, district, address, postalCode) {
    let result = await this.deliveryInfomationAdapter.add({
      userId,
      consignee,
      phone,
      province,
      city,
      district,
      address,
      postalCode
    }, DeliveryInfomation)
    return result
  }

  async edit (id, consignee, phone, province, city, district, address, postalCode) {
    let result = await this.deliveryInfomationAdapter.edit({
      id,
      consignee,
      phone,
      province,
      city,
      district,
      address,
      postalCode
    }, DeliveryInfomation)
    return result
  }

  async del (id) {
    let result = await this.deliveryInfomationAdapter.del({
      id
    }, DeliveryInfomation)
    return result
  }
}
