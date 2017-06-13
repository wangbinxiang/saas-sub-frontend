import RequestAdapter from '../../libs/RequestAdapter'
import ProductProxyTranslator from '../translator/ProductProxyTranslator'
import ProductProxyRequestJsonApi from '../request/ProductProxyRequestJsonApi'
import {
  PRODUCT_PROXY_GET
} from '../../config/apiFeatureConf'
import pageCLass from '../model/page'
/**
 * 产品代理适配器
 */
export default class ProductProxyAdapter extends RequestAdapter {
  constructor () {
    super()
    this.translator = new ProductProxyTranslator()
  }

  buildRequest (apiFeature, data) {
    this.requestObject = new ProductProxyRequestJsonApi(apiFeature, data)
  }

  get ({
    idList,
    filters,
    pages,
    sort,
    include,
    fields
  }, aProductClass) {
    this.buildRequest(PRODUCT_PROXY_GET, {
      idList,
      filters,
      pages,
      sort,
      include,
      fields
    })

    // 如果idList是数组 则需要数组形式的结果
    this.needArrayResult(idList)

    this.translator.pageClass = pageCLass

    this.activeClass = aProductClass

    return this.request()
  }
}
