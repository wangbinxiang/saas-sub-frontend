import MemberAdapter from '../adapter/MemberAdapter'
import Member from '../model/Member'
import RequestJsonApiParamsError from '../../libs/error/RequestJsonApiParamsError'
import {
  qiniuUpload
} from '../../tools/upload'

export default class MemberService {
  constructor () {
    this.userAdapter = new MemberAdapter()
  }

  async get (idList) {
    const members = await this.userAdapter.get({
      idList
    }, Member)

    return members
  }

  async _isCellphoneBind (cellPhone) {
    const filters = {
      cellPhone
    }

    const pages = {
      number: 1,
      size: 0
    }

    const member = await this.userAdapter.get({
      filters,
      pages
    }, Member)

    if (member) {
      return true
    }

    return false
  }

  async isCellphoneSignup (cellPhone) {
    return await this._isCellphoneBind(cellPhone)
  }

  async wechatLogin (openid, nickName, shopId, unionId, headimgurl) {
    let member
    member = await this.userAdapter.wechatLogin({ unionId, shopId }, Member)

    if (member) {
      if (member.noAvatar()) {
        // member没有头像就上传
        // 上传成功后头像地址写入member
        const avatarResult = await qiniuUpload(headimgurl)
        member = await this.userAdapter.updateAvatar({
          id: member.id,
          avatar: avatarResult.key
        }, Member)
      }
    } else {
      // 登陆失败用openid和nickname注册用户
      // 注册前上传
      const avatarResult = await qiniuUpload(headimgurl)
      // 头像地址
      const avatar = avatarResult && avatarResult.key ? avatarResult.key : ''
      member = await this.userAdapter.wechatSignup(openid, nickName, shopId, unionId, avatar, Member)
    }
    // try {
    //   member = await this.userAdapter.wechatLogin(unionId, Member)
    //   if (member.noAvatar()) {
    //     // member没有头像就上传
    //     // 上传成功后头像地址写入member
    //     // console.log(123);
    //     // console.log(headimgurl);
    //     const avatarResult = await qiniuUpload(headimgurl)
    //     member = await this.userAdapter.updateAvatar({
    //       id: member.id,
    //       avatar: avatarResult.key
    //     }, Member)
    //   }
    // } catch (err) {
    //   switch (err.constructor) {
    //     case RequestJsonApiParamsError:
    //       // 登陆失败用openid和nickname注册用户
    //       // 注册前上传
    //       const avatarResult = await qiniuUpload(headimgurl)
    //       // 头像地址
    //       const avatar = avatarResult && avatarResult.key ? avatarResult.key : ''
    //       member = await this.userAdapter.wechatSignup(openid, nickName, shopId, unionId, avatar, Member)
    //       break
    //     default:
    //       throw err
    //   }
    // }
    return member
    // 登陆用户
  }

  async wechatRelationshipLogin (openid, nickName, shopId, parentId, unionId, headimgurl) {
    let member = null
    let success = false // 关联是否成功标示
    member = await this.userAdapter.wechatRelationshipLogin({ unionId, parentId, shopId }, Member)

    if (member) {
      const avatarResult = await qiniuUpload(headimgurl)
      member = await this.userAdapter.updateAvatar({
        id: member.id,
        avatar: avatarResult.key
      }, Member)
    } else {
      // 登陆失败用openid和nickname注册用户
      const avatarResult = await qiniuUpload(headimgurl)
      // 头像地址
      const avatar = avatarResult && avatarResult.key ? avatarResult.key : ''
      member = await this.userAdapter.wechatRelationshipSignup(openid, nickName, shopId, parentId, unionId, avatar, Member)
      // 关联成功
      success = true
    }
    // try {
    //   member = await this.userAdapter.wechatRelationshipLogin(unionId, parentId, Member)
    //   if (member.noAvatar()) {
    //     // member没有头像就上传
    //     // 上传成功后头像地址写入member
    //     // console.log(123);
    //     // console.log(headimgurl);
    //     const avatarResult = await qiniuUpload(headimgurl)
    //     member = await this.userAdapter.updateAvatar({
    //       id: member.id,
    //       avatar: avatarResult.key
    //     }, Member)
    //   }
    // } catch (err) {
    //   switch (err.constructor) {
    //     case RequestJsonApiParamsError:
    //       // 登陆失败用openid和nickname注册用户
    //       const avatarResult = await qiniuUpload(headimgurl)
    //       // 头像地址
    //       const avatar = avatarResult && avatarResult.key ? avatarResult.key : ''
    //       member = await this.userAdapter.wechatRelationshipSignup(openid, nickName, shopId, parentId, unionId, avatar, Member)
    //       // 关联成功
    //       success = true
    //       break
    //     default:
    //       throw err
    //   }
    // }

    return {
      member,
      success
    }
    // 登陆用户
  }

  async wechatRelationshipSourceLogin (openid, nickName, shopId, parentId, unionId, source, sourceId, headimgurl) {
    let member = null
    let success = false // 关联是否成功标示

    member = await this.userAdapter.wechatSourceRelationshipLogin({ unionId, source, sourceId, parentId, shopId }, Member)
    if (member) {
      if (member.noAvatar()) {
        // member没有头像就上传
        // 上传成功后头像地址写入member
        // console.log(123);
        // console.log(headimgurl);
        const avatarResult = await qiniuUpload(headimgurl)
        member = await this.userAdapter.updateAvatar({
          id: member.id,
          avatar: avatarResult.key
        }, Member)
      }
    } else {
      const avatarResult = await qiniuUpload(headimgurl)
      // 头像地址
      const avatar = avatarResult && avatarResult.key ? avatarResult.key : ''
      member = await this.userAdapter.wechatSourceRelationshipSignup(openid, nickName, shopId, parentId, unionId, source, sourceId, avatar, Member)
      // 关联成功
      success = true
    }

    // try {
    //   member = await this.userAdapter.wechatSourceRelationshipLogin(unionId, source, sourceId, parentId, Member)
    //   if (member.noAvatar()) {
    //     // member没有头像就上传
    //     // 上传成功后头像地址写入member
    //     // console.log(123);
    //     // console.log(headimgurl);
    //     const avatarResult = await qiniuUpload(headimgurl)
    //     member = await this.userAdapter.updateAvatar({
    //       id: member.id,
    //       avatar: avatarResult.key
    //     }, Member)
    //   }
    // } catch (err) {
    //   switch (err.constructor) {
    //     case RequestJsonApiParamsError:
    //       // 登陆失败用openid和nickname注册用户
    //       const avatarResult = await qiniuUpload(headimgurl)
    //       // 头像地址
    //       const avatar = avatarResult && avatarResult.key ? avatarResult.key : ''
    //       member = await this.userAdapter.wechatSourceRelationshipSignup(openid, nickName, shopId, parentId, unionId, source, sourceId, avatar, Member)
    //       // 关联成功
    //       success = true
    //       break
    //     default:
    //       throw err
    //   }
    // }

    return {
      member,
      success
    }
    // 登陆用户
  }

  async bindCellphone (uid, cellPhone) {
    const isCellphoneBind = await this._isCellphoneBind(cellPhone)

    // 手机已绑定
    if (isCellphoneBind) {
      return false
    }
    return true
  }

  async relationship (uid) {
    let parent, children, childrenCount
    try {
      parent = await this.userAdapter.parent({
        id: uid
      }, Member)
    } catch (err) {

    }
    try {
      const sort = '-id'
      const pages = {
        number: 1,
        size: 50
      }
      const childrenResult = await this.userAdapter.children({
        id: uid,
        pages,
        sort
      }, Member)
      if (childrenResult && childrenResult.result) {
        children = childrenResult.result
        childrenCount = childrenResult.count ? childrenResult.count : 0
      }
    } catch (err) {

    }
    return {
      parent,
      children,
      childrenCount
    }
  }

  /**
   *
   * 绑定用户关系
   *
   * @param {any} id
   * @param {any} parentId
   * @returns
   *
   * @memberof MemberService
   */
  async bindParent (id, parentId) {
    const member = await this.userAdapter.bindParent({id, parentId}, Member)
    return member
  }
}
