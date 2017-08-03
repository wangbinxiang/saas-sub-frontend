import BaseRequest from '../../libs/BaseRequest'
import {
  GET
} from '../../config/httpMethodConf'
import {
  memberApiServiceLocation
} from '../../libs/ApiServiceLocation'
import {
  jsonApiGetUrl
} from '../../libs/helper'
import {
  MEMBER_GROUP_GET
} from '../../config/apiFeatureConf'

export default class MemberGroupRequestJsonApi extends BaseRequest {
  constructor (feature, originData) {
    const host = memberApiServiceLocation()
    super(host, feature, originData)
    this.dataType = 'userGroups'
  }

  get () {
    let BaseUrl = '/userGroups'

    let idList = this.originData.idList ? this.originData.idList : ''

    let filters = this.originData.filters ? this.originData.filters : ''

    let pages = this.originData.pages ? this.originData.pages : ''

    let sort = this.originData.sort ? this.originData.sort : ''

    const include = this.originData.include ? this.originData.include : ''

    this.url = jsonApiGetUrl(BaseUrl, idList, {
      filters,
      pages,
      sort,
      include
    })
    this.method = GET
  }

  buildFeature () {
    switch (this.feature) {
      case MEMBER_GROUP_GET:
        this.get()
        break
      default:
        throw new Error('Invalid feature method')
    }
  }
}
