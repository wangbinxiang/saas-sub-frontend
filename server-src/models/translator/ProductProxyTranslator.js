import Translator from '../../libs/Translator'
import ProductProxyJsonApiBodyReader from '../reader/ProductProxyJsonApiBodyReader'
import {
  PRODUCT_PROXY_SOURCE_PRODUCT,
  PRODUCT_PROXY_SOURCE_PRUCHASE_PRODUCT
} from '../../config/productProxyConf'

export default class ProductProxyTranslator extends Translator {
  readData (data, included) {
    const bodyReader = new ProductProxyJsonApiBodyReader(data, included)

    const source = bodyReader.value('source')
    const id = bodyReader.value('id')
    const productId = bodyReader.value('product').id
    const minPrice = bodyReader.value('product').minPrice
    const maxPrice = bodyReader.value('product').maxPrice
    const status = bodyReader.value('product').status
    const visible = bodyReader.value('product').visible
    const updateTime = bodyReader.value('product').updateTime
    const createTime = bodyReader.value('product').createTime
    const statusTime = bodyReader.value('product').statusTime
    const userId = bodyReader.value('product').user
    const productTypeId = bodyReader.value('product').productType

    let name = null
    let category = null
    let feature = null
    let logo = null
    let slides = null
    let description = null
    let prices = null
    //  自有商品
    if (source === PRODUCT_PROXY_SOURCE_PRODUCT) {
      name = bodyReader.value('product').name
      category = bodyReader.value('product').category
      feature = bodyReader.value('product').feature
      logo = bodyReader.value('product').logo
      slides = bodyReader.value('product').slides
      description = bodyReader.value('product').description
      prices = bodyReader.value('product').prices
    } else if (source === PRODUCT_PROXY_SOURCE_PRUCHASE_PRODUCT) {
      //  采购商品
      name = bodyReader.value('product').referenceProduct.name
      category = bodyReader.value('product').referenceProduct.category
      feature = bodyReader.value('product').referenceProduct.feature
      logo = bodyReader.value('product').referenceProduct.logo
      slides = bodyReader.value('product').referenceProduct.slides
      description = bodyReader.value('product').referenceProduct.description
      for (let i in bodyReader.value('product').prices) {
        if (bodyReader.value('product').referenceProduct.prices) {
          bodyReader.value('product').prices[i] = {
            title: bodyReader.value('product').referenceProduct.prices[i].title,
            price: bodyReader.value('product').prices[i].price
          }
        }
      }
      prices = bodyReader.value('product').prices
    }

    return {
      id,
      source,
      productId,
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
      productTypeId
    }
  }
}
