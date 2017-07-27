import MemberAdapter from '../adapter/MemberAdapter'
import MemberGroupAdapter from '../adapter/MemberGroupAdapter'
import MemberGroup from '../model/MemberGroup'

export default class PermissionService {
  static async memberGroup (shopId, userId) {
    let memberGroup = null
    if (userId > 0) {
      const memberAdapter = new MemberAdapter()
      memberGroup = await memberAdapter.userGroup({
        id: userId,
        shopId
      }, MemberGroup)
    } else {
      const filters = {
        shopId,
        category: 2
      }

      const memberGroupAdapter = new MemberGroupAdapter()
      const memberGroupResult = await memberGroupAdapter.get({
        filters
      }, MemberGroup)
      if (memberGroupResult.result) {
        memberGroup = memberGroupResult.result[0]
      }
    }
    return memberGroup
  }
}
