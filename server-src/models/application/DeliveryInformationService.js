import DeliveryInformationAdapter from '../adapter/DeliveryInformationAdapter'
import DeliveryInformation from '../model/DeliveryInformation'
import {
  DELIVERY_INFORMATION_ERROR_MAX_COUNT
} from '../../config/errorMessageConf'

const checkDeliveryInformationCanAdd = Symbol('checkDeliveryInformationCanAdd')

export default class DeliveryInfomationService {
  constructor () {
    this.deliveryInformationAdapter = new DeliveryInformationAdapter()
  }

  async index (idList, filters, pages) {
    const sort = '-id'
    let result = await this.deliveryInformationAdapter.get({
      idList,
      filters,
      pages,
      sort
    }, DeliveryInformation)

    if (result == null) {
      return result
    }

    let { page, result: deliveryInfomations } = result

    return { page, deliveryInfomations }
  }

  async get (id) {
    let deliveryInfomation = await this.deliveryInformationAdapter.get({
      idList: id
    }, DeliveryInformation)
    return deliveryInfomation
  }

// 检查是否可以添加地址
  async [checkDeliveryInformationCanAdd] (deliveryInformationsNumber) {
    const err = deliveryInformationsNumber >= 10 ? DELIVERY_INFORMATION_ERROR_MAX_COUNT //  地址数量已达最大值
    : null
    return err
  }

  async add (userId, consignee, phone, province, city, district, address, postalCode) {
    const filters = {
      userId: userId,
      status: 0
    }
    let deliveryInformations = await this.deliveryInformationAdapter.get({
      filters
    }, DeliveryInformation)
    const deliveryInformationsNumber = deliveryInformations.length
    const err = await this[checkDeliveryInformationCanAdd](deliveryInformationsNumber)
    if (err) {
      return {
        err
      }
    }
    let result = await this.deliveryInformationAdapter.add({
      userId,
      consignee,
      phone,
      province,
      city,
      district,
      address,
      postalCode
    }, DeliveryInformation)
    return {
      err,
      result
    }
  }

  async edit (id, consignee, phone, province, city, district, address, postalCode) {
    let result = await this.deliveryInformationAdapter.edit({
      id,
      consignee,
      phone,
      province,
      city,
      district,
      address,
      postalCode
    }, DeliveryInformation)
    return result
  }

  async del (id) {
    let result = await this.deliveryInformationAdapter.del({
      id
    }, DeliveryInformation)
    return result
  }
}
