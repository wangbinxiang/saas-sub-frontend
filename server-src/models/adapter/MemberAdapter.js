import RequestAdapter from '../../libs/RequestAdapter'
import MemberTranslator from '../translator/MemberTranslator'
import MemberGroupTranslator from '../translator/MemberGroupTranslator'
import MemberRequestJsonApi from '../request/MemberRequestJsonApi'
import pageCLass from '../model/page'
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

export default class MemberAdapter extends RequestAdapter {
  constructor () {
    super()
    this.translator = new MemberTranslator()
  }

  buildRequest (apiFeature, data) {
    this.requestObject = new MemberRequestJsonApi(apiFeature, data)
  }

  get ({
    idList,
    filters,
    pages
  }, aMemberClass) {
    this.buildRequest(MEMBER_GET, {
      idList,
      filters,
      pages
    })

    // 如果idList是数组 则需要数组形式的结果
    this.needArrayResult(idList)

    this.translator.pageClass = pageCLass

    this.activeClass = aMemberClass

    return this.request()
  }

  parent ({
    id
  }, aMemberClass) {
    this.buildRequest(MEMBER_PARENT, {
      id
    })

    // 如果idList是数组 则需要数组形式的结果
    this.needArrayResult(id)

    this.activeClass = aMemberClass

    return this.request()
  }

  children ({
    id,
    filters,
    pages,
    sort
  }, aMemberClass) {
    this.buildRequest(MEMBER_CHILDREN, {
      id,
      filters,
      pages,
      sort
    })

    this.translator.pageClass = pageCLass

    this.activeClass = aMemberClass

    return this.request()
  }

  // 普通微信注册和关系微信注册分开
  // 微信普通注册
  wechatSignup (openId, nickName, shopId, unionId, avatar, aUserClass) {
    this.buildRequest(MEMBER_SIGNUP, {
      shopId,
      openId,
      nickName,
      unionId,
      avatar
    })

    this.activeClass = aUserClass

    return this.request()
  }

  // 微信关系类型注册
  wechatRelationshipSignup (openId, nickName, shopId, parentId, unionId, avatar, aUserClass) {
    this.buildRequest(MEMBER_SIGNUP, {
      shopId,
      openId,
      nickName,
      parentId,
      unionId,
      avatar
    })

    this.activeClass = aUserClass

    return this.request()
  }

  // 微信第三方网站关系型注册
  wechatSourceRelationshipSignup (openId, nickName, shopId, parentId, unionId, source, sourceId, avatar, aUserClass) {
    this.buildRequest(MEMBER_SOURCE_SIGNUP, {
      shopId,
      openId,
      nickName,
      parentId,
      unionId,
      source,
      sourceId,
      avatar
    })

    this.activeClass = aUserClass

    return this.request()
  }

  // 普通微信登陆和关系微信登陆分开
  // 验证用户 async函数
  wechatLogin (unionId, aUserClass) {
    this.buildRequest(MEMBER_LOGIN, {
      unionId
    })

    this.activeClass = aUserClass

    return this.request()
  }

  // 关系类型登陆
  wechatRelationshipLogin (unionId, parentId, aUserClass) {
    this.buildRequest(MEMBER_LOGIN, {
      unionId,
      parentId
    })

    this.activeClass = aUserClass

    return this.request()
  }

  // 第三方网站关系类型登陆
  wechatSourceRelationshipLogin (unionId, source, sourceId, parentId, aUserClass) {
    this.buildRequest(MEMBER_SOURCE_LOGIN, {
      unionId,
      source,
      sourceId
      // parentId
    })

    this.activeClass = aUserClass

    return this.request()
  }

  updateAvatar ({
    id,
    avatar
  }, aMemberClass) {
    this.buildRequest(MEMBER_UPDATE_AVATAR, {
      id,
      avatar
    })

    this.activeClass = aMemberClass

    return this.request()
  }

  bindParent ({
    id,
    parentId
  }, aMemberClass) {
    this.buildRequest(MEMBER_BIND_PARENT, {
      id,
      parentId
    })

    this.activeClass = aMemberClass

    return this.request()
  }

  userGroup ({
    id,
    shopId
  }, aMemberGroupClass) {
    this.translator = new MemberGroupTranslator()

    this.buildRequest(MEMBER_USER_GROUP, {
      id,
      shopId
    })

    this.activeClass = aMemberGroupClass

    return this.request()
  }
}
