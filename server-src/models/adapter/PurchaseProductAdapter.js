import RequestAdapter from '../../libs/RequestAdapter'
import PurchaseProductTranslator from '../translator/PurchaseProductTranslator'
import PurchaseProductRequestJsonApi from '../request/PurchaseProductRequestJsonApi'
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
import pageCLass from '../model/page'

export default class PurchaseProductAdapter extends RequestAdapter {
  constructor () {
    super()
    this.translator = new PurchaseProductTranslator()
  }

  buildRequest (apiFeature, data) {
    this.requestObject = new PurchaseProductRequestJsonApi(apiFeature, data)
  }

  get ({
    idList,
    filters,
    pages,
    sort,
    include,
    fields
  }, aPurchaseClass) {
    this.buildRequest(PURCHASE_GET, {
      idList,
      filters,
      pages,
      sort,
      include
    })

    // 如果idList是数组 则需要数组形式的结果
    this.needArrayResult(idList)

    this.translator.pageClass = pageCLass

    this.activeClass = aPurchaseClass

    return this.request()
  }

  add ({
    id,
    userId,
    productTypeId,
    prices
  }, aPurchaseClass) {
    this.buildRequest(PURCHASE_ADD, {
      id,
      userId,
      productTypeId,
      prices
    })

    this.activeClass = aPurchaseClass

    return this.request()
  }

  del ({
    id
  }, aPurchaseClass) {
    this.buildRequest(PURCHASE_DELETE, {
      id
    })

    this.activeClass = aPurchaseClass

    return this.request()
  }

  savePrices ({
    id,
    prices
  }, aPurchaseClass) {
    this.buildRequest(PURCHASE_SAVE_PRICES, {
      id,
      prices
    })

    this.activeClass = aPurchaseClass

    return this.request()
  }

  on ({
    id
  }, aPurchaseClass) {
    this.buildRequest(PURCHASE_ON, {
      id
    })

    this.activeClass = aPurchaseClass

    return this.request()
  }

  off ({
    id
  }, aPurchaseClass) {
    this.buildRequest(PURCHASE_OFF, {
      id
    })

    this.activeClass = aPurchaseClass

    return this.request()
  }

  visible ({
    id
  }, aPurchaseClass) {
    this.buildRequest(PURCHASE_VISIBLE, {
      id
    })

    this.activeClass = aPurchaseClass

    return this.request()
  }

  invisible ({
    id
  }, aPurchaseClass) {
    this.buildRequest(PURCHASE_INVISIBLE, {
      id
    })

    this.activeClass = aPurchaseClass

    return this.request()
  }
}
