import MemberService from '../models/application/MemberService'

export async function account (ctx, next) {
  const title = '账号信息'

  const pageJs = webpackIsomorphicTools.assets().javascript.user

  const userId = ctx.state.user.id

  const memberService = new MemberService()

  const {
    member,
    memberGroup
  } = await memberService.account(userId, ctx._subId)

  console.log(member, memberGroup)

  await ctx.render('users/account', {
    title,
    pageJs,
    member,
    memberGroup
  })
}

export async function relationship (ctx, next) {
  const title = '关系信息'

  const pageJs = webpackIsomorphicTools.assets().javascript.user

  const userId = ctx.state.user.id

  const memberService = new MemberService()

  const relationship = await memberService.relationship(userId)

  await ctx.render('users/relationship', {
    title,
    pageJs,
    relationship
  })
}
