import Translator from '../../libs/Translator'
import PurchaseProductJsonApiBodyReader from '../reader/PurchaseProductJsonApiBodyReader'

export default class PurchaseProductTranslator extends Translator {
  readData (data, included) {
    const bodyReader = new PurchaseProductJsonApiBodyReader(data, included)

    let id = bodyReader.value('id')
    let name = bodyReader.value('referenceProduct').name
    let category = bodyReader.value('referenceProduct').category
    let feature = bodyReader.value('referenceProduct').feature
    let logo = bodyReader.value('referenceProduct').logo
    let minPrice = bodyReader.value('minPrice')
    let maxPrice = bodyReader.value('maxPrice')
    let description = bodyReader.value('referenceProduct').description
    let slides = bodyReader.value('referenceProduct').slides

    for (let i in bodyReader.value('prices')) {
      if (bodyReader.value('referenceProduct').prices) {
        bodyReader.value('prices')[i] = {
          title: bodyReader.value('referenceProduct').prices[i].title,
          price: bodyReader.value('prices')[i].price
        }
      }
    }

    let prices = bodyReader.value('prices')
    let updateTime = bodyReader.value('updateTime')
    let createTime = bodyReader.value('createTime')
    let statusTime = bodyReader.value('statusTime')
    let status = bodyReader.value('status')
    let visible = bodyReader.value('visible')
    let userId = bodyReader.value('user')
    let productTypeId = bodyReader.value('productType')
    let snapshots = bodyReader.value('referenceProduct').snapshots
    let distributionProduct = bodyReader.value('distributionProduct')
    let referenceProduct = bodyReader.value('referenceProduct')

    return {
      id,
      name,
      category,
      feature,
      logo,
      minPrice,
      maxPrice,
      description,
      slides,
      prices,
      updateTime,
      createTime,
      statusTime,
      status,
      visible,
      userId,
      productTypeId,
      snapshots,
      distributionProduct,
      referenceProduct
    }
  }
}
