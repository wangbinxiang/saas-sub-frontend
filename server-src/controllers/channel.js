import ChannelService from '../models/application/ChannelService'
import ProductService from '../models/application/ProductService'
import config from 'config'
import lodash from 'lodash'
import {
  listStyle
} from '../tools/imgStyle'

export async function productType (ctx, next) {
  // 频道信息
  let isNext = false

  const productTypeId = ctx.params.id

  const number = ctx.query.number ? ctx.query.number : 1

  const size = ctx.query.size ? ctx.query.size : 10

  const channelService = await new ChannelService()
  let {
    page,
    products,
    productType
  } = await channelService.productType(number, size, productTypeId, ctx._subId)

  if (!productType) {
    // 404
    await next()
  } else {
    if (page && page.haveNext()) {
      isNext = true
    }

    if (ctx.accepts('html', 'text', 'json') === 'json') {
      ctx.body = {
        products,
        isNext
      }
    } else {
      // 获取当前是否有
      const other = config.get('productMapping')

      if (other[ctx._subId] && other[ctx._subId][productTypeId]) {
        const productService = new ProductService()
        const otherProducts = await productService.list(other[ctx._subId][productTypeId])
        if (otherProducts) {
          lodash.map(otherProducts, function (product) {
            product.productId = product.id
            product.source = 0
            return product
          })
          if (products) {
            products = lodash.concat(products, otherProducts)
          } else {
            products = otherProducts
          }
        }
      }

      const title = productType.name + ' - ' + ctx._shop.title

      const imgHost = config.get('qiniu.bucket.subImg.url')

      const imgStyle = config.get('qiniu.bucket.subImg.style.productWaterFall')

      const pageJs = webpackIsomorphicTools.assets().javascript.channel

      const imgListStyle = listStyle(ctx)

      await ctx.render('channel/productType', {
        productTypeId,
        title,
        pageJs,
        number,
        imgHost,
        imgStyle,
        imgListStyle,
        isNext,
        products,
        productType
      })
    }
  }
}

export async function category (ctx, next) {
  // 频道信息
  let isNext = false

  const categoryId = ctx.params.id

  const number = ctx.query.number ? ctx.query.number : 1

  const size = ctx.query.size ? ctx.query.size : 10

  const channelService = await new ChannelService()
  const {
    page,
    articles,
    category
  } = await channelService.category(number, size, categoryId, ctx._subId)

  if (!category) {
    // 404
    await next()
  } else {
    if (page && page.haveNext()) {
      isNext = true
    }

    if (ctx.accepts('html', 'text', 'json') === 'json') {
      ctx.body = {
        articles,
        isNext
      }
    } else {
      const title = category.name + ' - ' + ctx._shop.title

      const pageJs = webpackIsomorphicTools.assets().javascript.channel

      const imgHost = config.get('qiniu.bucket.subImg.url')

      const imgStyle = config.get('qiniu.bucket.subImg.style.productWaterFall')

      const imgListStyle = listStyle(ctx)

      await ctx.render('channel/category', {
        categoryId,
        title,
        pageJs,
        number,
        isNext,
        articles,
        category,
        imgHost,
        imgStyle,
        imgListStyle
      })
    }
  }
}

export async function projectType (ctx, next) {
  // 频道信息
  let isNext = false

  const projectTypeId = ctx.params.id

  const number = ctx.query.number ? ctx.query.number : 1

  const size = ctx.query.size ? ctx.query.size : 10

  const channelService = await new ChannelService()
  const {
    page,
    projects,
    projectType
  } = await channelService.projects(number, size, projectTypeId, ctx._subId)

  if (!projectType) {
    // 404
    await next()
  } else {
    if (page && page.haveNext()) {
      isNext = true
    }

    if (ctx.accepts('html', 'text', 'json') === 'json') {
      ctx.body = {
        projects,
        isNext
      }
    } else {
      const title = projectType.name + ' - ' + ctx._shop.title

      const pageJs = webpackIsomorphicTools.assets().javascript.channel

      const imgHost = config.get('qiniu.bucket.subImg.url')

      const imgStyle = config.get('qiniu.bucket.subImg.style.productWaterFall')

      const imgListStyle = listStyle(ctx)

      await ctx.render('channel/projectType', {
        projectTypeId,
        title,
        pageJs,
        number,
        isNext,
        projects,
        projectType,
        imgHost,
        imgStyle,
        imgListStyle
      })
    }
  }
}

/**
 * 文章二级导航
 *
 * @export
 * @param {any} ctx
 * @param {any} next
 */
export async function articleNavigation (ctx, next) {
  const id = ctx.params.id ? ctx.params.id : 0

  const number = ctx.query.number ? ctx.query.number : 1

  const size = ctx.query.size ? ctx.query.size : 20

  let isAjax = false
  let isNext = false
  if (ctx.accepts('html', 'text', 'json') === 'json') {
    isAjax = true
  }

  const channelService = await new ChannelService()

  const {
    page,
    categories,
    channelName,
    articles
  } = await channelService.articleNavigation(ctx._subId, id, number, size, isAjax)

  if (page && page.haveNext()) {
    isNext = true
  }

  if (isAjax) {
    ctx.body = {
      articles,
      isNext
    }
  } else {
    const title = channelName + ' - ' + ctx._shop.title

    const pageJs = webpackIsomorphicTools.assets().javascript.articleNavigation

    const imgHost = config.get('qiniu.bucket.subImg.url')

    const imgListStyle = listStyle(ctx)

    await ctx.render('channel/articleNavigation', {
      id,
      title,
      pageJs,
      number,
      isNext,
      articles,
      channelName,
      categories,
      imgHost,
      imgListStyle
    })
  }
}

export async function projectNavigation (ctx, next) {
  const id = ctx.params.id ? ctx.params.id : 0

  const number = ctx.query.number ? ctx.query.number : 1

  const size = ctx.query.size ? ctx.query.size : 20

  let isAjax = false
  let isNext = false
  if (ctx.accepts('html', 'text', 'json') === 'json') {
    isAjax = true
  }

  const channelService = await new ChannelService()

  const {
    page,
    projectTypes,
    channelName,
    projects
  } = await channelService.projectNavigation(ctx._subId, id, number, size, isAjax)

  if (page && page.haveNext()) {
    isNext = true
  }

  if (isAjax) {
    ctx.body = {
      projects,
      isNext
    }
  } else {
    const title = channelName + ' - ' + ctx._shop.title

    const pageJs = webpackIsomorphicTools.assets().javascript.projectNavigation

    const imgHost = config.get('qiniu.bucket.subImg.url')

    const imgListStyle = listStyle(ctx)

    await ctx.render('channel/projectNavigation', {
      id,
      title,
      pageJs,
      number,
      isNext,
      projects,
      channelName,
      projectTypes,
      imgHost,
      imgListStyle
    })
  }
}
