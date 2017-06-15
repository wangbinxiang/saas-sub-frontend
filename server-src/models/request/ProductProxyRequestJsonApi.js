import BaseRequest from '../../libs/BaseRequest'
import {
  GET
} from '../../config/httpMethodConf'
import {
  productApiServiceLocation
} from '../../libs/ApiServiceLocation'
import {
  PRODUCT_PROXY_GET
} from '../../config/apiFeatureConf'
import {
  jsonApiGetUrl
} from '../../libs/helper'

/**
 * 产品json api 请求类
 */
export default class ProductProxyRequestJsonApi extends BaseRequest {
  constructor (feature, originData) {
    const host = productApiServiceLocation()
    super(host, feature, originData)
    // this.dataType = 'products'
  }

  /**
   * 获取产品
   * @author wangbinxiang
   * @date   2016-09-22T17:31:37+0800
   * @return {[type]}                 [description]
   */
  get () {
    let BaseUrl = '/products/search'

    let idList = this.originData.idList ? this.originData.idList : ''

    let filters = this.originData.filters ? this.originData.filters : ''

    let pages = this.originData.pages ? this.originData.pages : ''

    let sort = this.originData.sort ? this.originData.sort : ''

    const include = this.originData.include ? this.originData.include : ''

    const fields = this.originData.fields ? this.originData.fields : ''

    this.url = jsonApiGetUrl(BaseUrl, idList, {
      filters,
      pages,
      sort,
      include,
      fields
    })
    this.method = GET
  }

  buildFeature () {
    switch (this.feature) {
      case PRODUCT_PROXY_GET:
        this.get()
        break
      default:
        throw new Error('Invalid feature method')
    }
  }
}
