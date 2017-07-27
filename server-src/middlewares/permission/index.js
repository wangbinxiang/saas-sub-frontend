import PermissionService from '../../models/application/PermissionService'

export async function permission (ctx, next) {
    //  获取当前用户
    // let memberGroup = null
  const shopId = ctx._subId
  const userId = ctx.isAuthenticated() ? ctx.state.user.id : null

  const memberGroup = await PermissionService.memberGroup(shopId, userId)

  ctx.memberGroup = memberGroup || null

  await next()
}
