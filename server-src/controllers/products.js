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
import {
  verifyPermission
} from '../tools/permission'
import {
  PERMISSION_PRODUCT_TYPE_DETAIL_SHOW,
  PERMISSION_PRODUCT_TYPE_TRADE
} from '../config/memberGroupConf'

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
    // ctx.memberGroup.purview = { [PERMISSION_PRODUCT_TYPE_DETAIL_SHOW]: [product.productTypeId] }
    const pagePermission = verifyPermission(ctx.memberGroup, PERMISSION_PRODUCT_TYPE_DETAIL_SHOW, product.productTypeId)

    if (product.isOnSale()) {
      const imgDetailSlideStyle = detailSlideStyle(ctx)
      const imgDetailStyle = detailStyle(ctx)

      const showRelationship = isAuthRelationship(ctx)

      const title = product.name + ' - ' + ctx._shop.title

      const pageJs = webpackIsomorphicTools.assets().javascript.product

      const imgHost = config.get('qiniu.bucket.subImg.url')

      const showRebate = !!isAuthRelationship(ctx)

      // 交易权限
      // ctx.memberGroup.purview = { [PERMISSION_PRODUCT_TYPE_TRADE]: [product.productTypeId] }
      let tradePermission = null
      if (pagePermission) {
        tradePermission = verifyPermission(ctx.memberGroup, PERMISSION_PRODUCT_TYPE_TRADE, product.productTypeId)
      }

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
        showRebate,
        pagePermission,
        tradePermission
      })
    } else {
      await ctx.render('common/info', {
        title: '产品详情',
        info: '产品已下架。'
      })
    }
  }
}
