import BaseRequest from '../../libs/BaseRequest'
import {
  GET,
  POST,
  PUT
  // DELETE
} from '../../config/httpMethodConf'
import {
  memberApiServiceLocation
} from '../../libs/ApiServiceLocation'
import {
  jsonApiGetUrl
} from '../../libs/helper'
import {
  MEMBER_GET,
  MEMBER_SIGNUP,
  MEMBER_LOGIN,
  MEMBER_SOURCE_LOGIN,
  MEMBER_SOURCE_SIGNUP,
  MEMBER_PARENT,
  MEMBER_CHILDREN,
  MEMBER_UPDATE_AVATAR,
  MEMBER_BIND_PARENT,
  MEMBER_USER_GROUP
} from '../../config/apiFeatureConf'

export default class MemberRequestJsonApi extends BaseRequest {
  constructor (feature, originData) {
    const host = memberApiServiceLocation()
    super(host, feature, originData)
    this.dataType = 'users'
  }

  get () {
    const baseUrl = '/users'

    const idList = this.originData.idList ? this.originData.idList : ''

    const filters = this.originData.filters ? this.originData.filters : ''

    const pages = this.originData.pages ? this.originData.pages : ''

    this.url = jsonApiGetUrl(baseUrl, idList, {
      filters,
      pages
    })

    this.method = GET
  }

  parent () {
    this.url = '/users/' + this.originData.id + '/parent'

    this.method = GET
  }

  children () {
    const baseUrl = '/users/' + this.originData.id + '/children'

    const filters = this.originData.filters ? this.originData.filters : ''

    const pages = this.originData.pages ? this.originData.pages : ''

    const sort = this.originData.sort ? this.originData.sort : ''

    this.url = jsonApiGetUrl(baseUrl, null, {
      filters,
      pages,
      sort
    })

    this.method = GET
  }

  signup () {
    let url = '/users'
    this.url = url

    this.method = POST

    this.setSuccessCode(201)
    this.setParamsErrorCode(409)

    let attributes = {
      shopId: this.originData.shopId,
      openId: this.originData.openId,
      nickName: this.originData.nickName,
      parentId: this.originData.parentId,
      unionId: this.originData.unionId,
      avatar: this.originData.avatar
    }

    this.buildData(attributes)
  }

  sourceSignup () {
    let url = '/users'
    this.url = url

    this.method = POST

    this.setSuccessCode(201)
    this.setParamsErrorCode(409)

    let attributes = {
      shopId: this.originData.shopId,
      openId: this.originData.openId,
      nickName: this.originData.nickName,
      parentId: this.originData.parentId,
      unionId: this.originData.unionId,
      source: this.originData.source,
      sourceId: this.originData.sourceId,
      avatar: this.originData.avatar
    }

    this.buildData(attributes)
  }

  login () {
    let url = '/users/signIn'
    this.url = url

    this.method = POST

    let attributes = {
      unionId: this.originData.unionId,
      parentId: this.originData.parentId,
      shopId: this.originData.shopId
    }

    this.buildData(attributes)
  }

  // 第三方网站登陆
  sourceLogin () {
    let url = '/users/signIn'

    this.url = url

    this.method = POST

    let attributes = {
      unionId: this.originData.unionId,
      source: this.originData.source,
      sourceId: this.originData.sourceId,
      parentId: this.originData.parentId,
      shopId: this.originData.shopId
    }

    this.buildData(attributes)
  }

  updateAvatar () {
    this.url = '/users/' + this.originData.id + '/avatar'

    this.method = PUT

    let attributes = {
      avatar: this.originData.avatar
    }

    this.buildData(attributes)
  }

  bindParent () {
    this.url = '/users/' + this.originData.id + '/bindParent'

    this.method = PUT

    let attributes = {
      parentId: this.originData.parentId
    }

    this.buildData(attributes)
  }

  userGroup () {
    this.url = '/user/' + this.originData.id + '/shop/' + this.originData.shopId + '/userGroup'

    this.method = GET
  }

  buildFeature () {
    switch (this.feature) {
      case MEMBER_GET:
        this.get()
        break
      case MEMBER_LOGIN:
        this.login()
        break
      case MEMBER_SIGNUP:
        this.signup()
        break
      case MEMBER_SOURCE_LOGIN:
        this.sourceLogin()
        break
      case MEMBER_SOURCE_SIGNUP:
        this.sourceSignup()
        break
      case MEMBER_PARENT:
        this.parent()
        break
      case MEMBER_CHILDREN:
        this.children()
        break
      case MEMBER_UPDATE_AVATAR:
        this.updateAvatar()
        break
      case MEMBER_BIND_PARENT:
        this.bindParent()
        break
      case MEMBER_USER_GROUP:
        this.userGroup()
        break
      default:
        throw new Error('Invalid feature method')
    }
  }
}
