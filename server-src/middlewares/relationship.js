import {
  inWehcat
} from '../tools/wechat'
import {
  isAuthRelationship
} from '../tools/auth'
import {
  getParameterValidRelationshipId
} from '../tools/relationship'
import MemberService from '../models/application/MemberService'

/**
 * 绑定用户关系中间件
 *
 * @export
 * @param {any} ctx
 * @param {any} next
 */
export async function bindRelationship (ctx, next) {
  // 登陆 && 微信内 && 关系型网站 && 有有效关联参数
  if (inWehcat(ctx) && ctx.isAuthenticated() && isAuthRelationship(ctx)) {
    const relationshipId = getParameterValidRelationshipId(ctx)
    if (relationshipId) {
      console.log(relationshipId)
      const memberService = new MemberService()
      // 绑定用户关系 不用等待
      memberService.bindParent(ctx.state.user.id, relationshipId)
    }
  }
  await next()
}
