import RequestAdapter from '../../libs/RequestAdapter'
import DeliveryInformationTranslator from '../translator/DeliveryInformationTranslator'
import DeliveryInformationRequestJsonApi from '../request/DeliveryInformationRequestJsonApi'
import {
    DELIVERY_INFORMATION_GET,
    DELIVERY_INFORMATION_ADD,
    DELIVERY_INFORMATION_EDIT,
    DELIVERY_INFORMATION_DEL
} from '../../config/apiFeatureConf'
import pageCLass from '../model/page'

export default class DeliverInformationAdapter extends RequestAdapter {
  constructor () {
    super()
    this.translator = new DeliveryInformationTranslator()
  }

  buildRequest (apiFeature, data) {
    this.requestObject = new DeliveryInformationRequestJsonApi(apiFeature, data)
  }

  get ({
        idList,
        filters,
        pages,
        sort
    }, aDeliveryInformationClass) {
    this.buildRequest(DELIVERY_INFORMATION_GET, {
      idList,
      filters,
      pages,
      sort
    })

        // 如果idList是数组 则需要数组形式的结果
    this.needArrayResult(idList)

    this.translator.pageClass = pageCLass

    this.activeClass = aDeliveryInformationClass

    return this.request()
  }

  add ({
        userId,
        nameconsignee,
        phone,
        province,
        city,
        district,
        address,
        postalCode
    }, aDeliveryInformationClass) {
    this.buildRequest(DELIVERY_INFORMATION_ADD, {
      userId,
      nameconsignee,
      phone,
      province,
      city,
      district,
      address,
      postalCode
    })

    this.activeClass = aDeliveryInformationClass

    return this.request()
  }

  edit ({
        id,
        nameconsignee,
        phone,
        province,
        city,
        district,
        address,
        postalCode
    }, aDeliveryInformationClass) {
    this.buildRequest(DELIVERY_INFORMATION_EDIT, {
      id,
      nameconsignee,
      phone,
      province,
      city,
      district,
      address,
      postalCode
    })

    this.activeClass = aDeliveryInformationClass

    return this.request()
  }

  del ({
        id
    }, aDeliveryInformationClass) {
    this.buildRequest(DELIVERY_INFORMATION_DEL, {
      id
    })

    this.activeClass = aDeliveryInformationClass

    return this.request()
  }
}
