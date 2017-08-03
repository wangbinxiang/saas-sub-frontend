import BaseRequest from '../../libs/BaseRequest'
import {
    GET,
    POST,
    PUT,
    DELETE
} from '../../config/httpMethodConf'
import {
    DELIVERY_INFORMATION_GET,
    DELIVERY_INFORMATION_ADD,
    DELIVERY_INFORMATION_EDIT,
    DELIVERY_INFORMATION_DEL
} from '../../config/apiFeatureConf'
import {
    memberApiServiceLocation
} from '../../libs/ApiServiceLocation'
import {
    jsonApiGetUrl
} from '../../libs/helper'

export default class DeliveryInformationRequestJsonApi extends BaseRequest {
  constructor (feature, originData) {
    const host = memberApiServiceLocation()
    super(host, feature, originData)
    this.dataType = 'deliveryInformations'
  }

  get () {
    let BaseUrl = '/deliveryInformations'

    let idList = this.originData.idList ? this.originData.idList : ''

    let filters = this.originData.filters ? this.originData.filters : ''

    let pages = this.originData.pages ? this.originData.pages : ''

    let sort = this.originData.sort ? this.originData.sort : ''

    this.url = jsonApiGetUrl(BaseUrl, idList, {
      filters,
      pages,
      sort
    })

    this.method = GET
  }

  add () {
    let url = '/deliveryInformations'

    this.url = url

    this.method = POST

    this.setSuccessCode(201)

    let attributes = {
      userId: this.originData.userId,
      consignee: this.originData.consignee,
      phone: this.originData.phone,
      province: this.originData.province,
      city: this.originData.city,
      district: this.originData.district,
      address: this.originData.address,
      postalCode: this.originData.postalCode
    }

    this.buildData(attributes)
  }

  edit () {
    let url = '/deliveryInformations/'
    let id = this.originData.id

    this.url = url + id
    this.method = PUT

    let attributes = {
      consignee: this.originData.consignee,
      phone: this.originData.phone,
      province: this.originData.province,
      city: this.originData.city,
      district: this.originData.district,
      address: this.originData.address,
      postalCode: this.originData.postalCode
    }

    this.buildData(attributes)
  }

  delete () {
    let url = '/deliveryInformations/'
    let id = this.originData.id

    this.url = url + id
    this.method = DELETE
  }

  buildFeature () {
    switch (this.feature) {
      case DELIVERY_INFORMATION_GET:
        this.get()
        break
      case DELIVERY_INFORMATION_ADD:
        this.add()
        break
      case DELIVERY_INFORMATION_EDIT:
        this.edit()
        break
      case DELIVERY_INFORMATION_DEL:
        this.delete()
        break
      default:
        throw new Error('Invalid feature method')
    }
  }
}
