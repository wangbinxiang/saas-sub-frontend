//静态资源地址

//设置js资源地址
export async function jsLocation(ctx, next) {
    ctx.state.commonsJs = webpackIsomorphicTools.assets().javascript.commons
    await next()
}