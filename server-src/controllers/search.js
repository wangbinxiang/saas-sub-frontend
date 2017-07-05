
export async function products (ctx, next) {
  ctx.body = { '搜索页面': ctx.query.keyword }
}
