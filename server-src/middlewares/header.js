
/**
 * 浏览器停止缓存
 */
export async function noCache(ctx, next) {
    ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    ctx.set('Pragma', 'no-cache')
    ctx.set('Expires', 'Thu, 19 Nov 1981 08:52:00 GMT')

    await next();
}