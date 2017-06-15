import ProductService from '../models/application/ProductService'
import nl2br from 'nl2br'
import config from 'config'
import {
  isAuthRelationship
} from '../tools/auth'
import {
  detailSlideStyle,
  detailStyle
} from '../tools/imgStyle'

/**
 * 产品详情页面
 * @author wangbinxiang
 * @date   2016-09-20T10:44:47+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function detail (ctx, next) {
  // 产品id
  const subId = ctx._subId
  // try {
  const id = ctx.params.id
  const source = ctx.params.source
  const productService = new ProductService()
  const { product, isPruchase } = await productService.detail(id, source, subId)
  if (product === null) {
    await next()
  } else {
    if (product.isOnSale()) {
      const imgDetailSlideStyle = detailSlideStyle(ctx)
      const imgDetailStyle = detailStyle(ctx)

      const showRelationship = isAuthRelationship(ctx)

      const title = product.name + ' - ' + ctx._shop.title

      const pageJs = webpackIsomorphicTools.assets().javascript.product

      const imgHost = config.get('qiniu.bucket.subImg.url')

      const showRebate = !!isAuthRelationship(ctx)

      await ctx.render('products/detail', {
        title,
        isPruchase,
        product,
        pageJs,
        nl2br,
        subId,
        imgHost,
        showRelationship,
        imgDetailSlideStyle,
        imgDetailStyle,
        showRebate
      })
    } else {
      await ctx.render('common/info', {
        title: '产品详情',
        info: '产品已下架。'
      })
    }
  }
}
