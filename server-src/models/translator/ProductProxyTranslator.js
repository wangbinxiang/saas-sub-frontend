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
    const id = bodyReader.data.id
    const productId = bodyReader.data.product.id
    const minPrice = bodyReader.data.product.minPrice
    const maxPrice = bodyReader.data.product.maxPrice
    const status = bodyReader.data.product.status
    const visible = bodyReader.data.product.visible
    const updateTime = bodyReader.data.product.updateTime
    const createTime = bodyReader.data.product.createTime
    const statusTime = bodyReader.data.product.statusTime
    const userId = bodyReader.data.product.user
    const productTypeId = bodyReader.data.product.productType

    let name = null
    let category = null
    let feature = null
    let logo = null
    let slides = null
    let description = null
    let prices = null

    if (source === PRODUCT_PROXY_SOURCE_PRODUCT) {
      name = bodyReader.data.product.name
      category = bodyReader.data.product.category
      feature = bodyReader.data.product.featurevis
      logo = bodyReader.data.product.logo
      slides = bodyReader.data.product.slides
      description = bodyReader.data.product.description
      prices = bodyReader.data.product.prices
    } else if (source === PRODUCT_PROXY_SOURCE_PRUCHASE_PRODUCT) {
      name = bodyReader.data.product.referenceProduct.name
      category = bodyReader.data.product.referenceProduct.category
      feature = bodyReader.data.product.referenceProduct.feature
      logo = bodyReader.data.product.referenceProduct.logo
      slides = bodyReader.data.product.referenceProduct.slides
      description = bodyReader.data.product.referenceProduct.description
      for (let i in bodyReader.data.product.prices) {
        bodyReader.data.product.prices[i] = {
          title: bodyReader.data.product.referenceProduct.prices[i].title,
          price: bodyReader.data.product.prices[i].price
        }
      }
      prices = bodyReader.data.product.prices
    }

    return {
      id,
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
