import BaseRequest from '../../libs/BaseRequest'
import {
  GET,
  POST,
  PUT,
  DELETE
} from '../../config/httpMethodConf'
import {
  productApiServiceLocation
} from '../../libs/ApiServiceLocation'
import {
  PURCHASE_GET,
  PURCHASE_ADD,
  PURCHASE_SAVE_PRICES,
  PURCHASE_ON,
  PURCHASE_OFF,
  PURCHASE_VISIBLE,
  PURCHASE_INVISIBLE,
  PURCHASE_DELETE
} from '../../config/apiFeatureConf'
import {
  jsonApiGetUrl
} from '../../libs/helper'

export default class PurchaseProductRequestJsonApi extends BaseRequest {
  constructor (feature, originData) {
    const host = productApiServiceLocation()
    super(host, feature, originData)
    this.dataType = 'purchaseProducts'
  }

// 获取采购商品信息
  get () {
    let BaseUrl = '/purchaseProducts'

    let idList = this.originData.idList ? this.originData.idList : ''

    let filters = this.originData.filters ? this.originData.filters : ''

    let pages = this.originData.pages ? this.originData.pages : ''

    let sort = this.originData.sort ? this.originData.sort : ''

    const include = this.originData.include ? this.originData.include : ''
    const fields = this.originData.fields ? this.originData.fields : ''

    this.url = jsonApiGetUrl(BaseUrl, idList, { filters, pages, sort, include, fields })
    this.method = GET
  }

  // 加入采购
  add () {
    let id = this.originData.id

    let url = '/distributionProducts/' + id + '/purchase'

    this.url = url

    this.method = POST

    this.setSuccessCode(201)

    let attributes = {
      productTypeId: this.originData.productTypeId,
      userId: this.originData.userId,
      prices: this.originData.prices
    }

    this.buildData(attributes)
  }

  // 保存采购商品价格
  savePrices () {
    this.dataType = 'purchaseProducts'

    let id = this.originData.id
    let url = '/purchaseProducts/' + id + '/prices '
    this.url = url
    this.method = PUT
    let attributes = {
      prices: this.originData.prices
    }

    this.buildData(attributes)
  }

  // 上架采购商品
  on () {
    const url = '/purchaseProducts/' + this.originData.id + '/on'

    this.url = url

    this.method = PUT
  }

  // 下架采购商品
  off () {
    const url = '/purchaseProducts/' + this.originData.id + '/off'

    this.url = url

    this.method = PUT
  }

  // 显示采购商品
  visible () {
    const url = '/purchaseProducts/' + this.originData.id + '/visible'

    this.url = url

    this.method = PUT
  }

  // 隐藏采购商品
  invisible () {
    const url = '/purchaseProducts/' + this.originData.id + '/invisible'

    this.url = url

    this.method = PUT
  }

  // 撤销采购
  delete () {
    let url = '/purchaseProducts/'
    let id = this.originData.id

    this.url = url + id
    this.method = DELETE
  }

  buildFeature () {
    switch (this.feature) {
      case PURCHASE_GET:
        this.get()
        break
      case PURCHASE_ADD:
        this.add()
        break
      case PURCHASE_SAVE_PRICES:
        this.savePrices()
        break
      case PURCHASE_DELETE:
        this.delete()
        break
      case PURCHASE_ON:
        this.on()
        break
      case PURCHASE_OFF:
        this.off()
        break
      case PURCHASE_VISIBLE:
        this.visible()
        break
      case PURCHASE_INVISIBLE:
        this.invisible()
        break
      default:
        throw new Error('Invalid feature method')
    }
  }
}
