import RequestAdapter from '../../libs/RequestAdapter'
import MemberGroupTranslator from '../translator/MemberGroupTranslator'
import MemberGroupRequestJsonApi from '../request/MemberGroupRequestJsonApi'
import pageCLass from '../model/page'
import {
  MEMBER_GROUP_GET
} from '../../config/apiFeatureConf'
/**
 * 前台用户组适配器
 *
 * @export
 * @class MemberGroupAdapter
 * @extends {RequestAdapter}
 */
export default class MemberGroupAdapter extends RequestAdapter {
  constructor () {
    super()
    this.translator = new MemberGroupTranslator()
  }

  buildRequest (apiFeature, data) {
    this.requestObject = new MemberGroupRequestJsonApi(apiFeature, data)
  }

  get ({
    idList,
    filters,
    pages
  }, aMemberGroupClass) {
    this.buildRequest(MEMBER_GROUP_GET, {
      idList,
      filters,
      pages
    })

    // 如果idList是数组 则需要数组形式的结果
    this.needArrayResult(idList)

    this.translator.pageClass = pageCLass

    this.activeClass = aMemberGroupClass

    return this.request()
  }
}
