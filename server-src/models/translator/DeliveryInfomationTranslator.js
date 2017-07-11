import Translator from '../../libs/Translator'
import DeliveryInfomationJsonApiBodyReader from '../reader/DeliveryInfomationJsonApiBodyReader'

export default class CategoryTranslator extends Translator {
  constructor () {
    super()
  }

  readData (data) {
    const bodyReader = new DeliveryInfomationJsonApiBodyReader(data)

    let id = bodyReader.value('id')
    let consignee = bodyReader.value('consignee')
    let phone = bodyReader.value('phone')
    let province = bodyReader.value('province')
    let city = bodyReader.value('city')
    let district = bodyReader.value('district')
    let address = bodyReader.value('address')
    let postalCode = bodyReader.value('postalCode')
    let status = bodyReader.value('status')
    let updateTime = bodyReader.value('updateTime')
    let createTime = bodyReader.value('createTime')
    let statusTime = bodyReader.value('statusTime')

    return {
      id,
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
      statusTime }
  }
}
