import SearchService from '../models/application/SearchService'
import config from 'config'
import {
  listStyle
} from '../tools/imgStyle'

export async function products (ctx, next) {
  let isNext = false
  let products = null

  const number = ctx.query.number ? ctx.query.number : 1

  const size = ctx.query.size ? ctx.query.size : 20

  const keyword = ctx.query.keyword

  const searchService = await new SearchService()

  let result = await searchService.index(number, size, keyword)
  if (result !== null) {
    let page = result.page
    products = result.products

    if (page && page.haveNext()) {
      isNext = true
    }
  }
  if (ctx.accepts('html', 'text', 'json') === 'json') {
    ctx.body = {
      products,
      isNext
    }
  } else {
    const title = '商品搜索'

    const imgHost = config.get('qiniu.bucket.subImg.url')

    const imgStyle = config.get('qiniu.bucket.subImg.style.productWaterFall')

    const pageJs = webpackIsomorphicTools.assets().javascript.search

    const imgListStyle = listStyle(ctx)

    await ctx.render('search/index', {
      title,
      pageJs,
      number,
      imgHost,
      imgStyle,
      imgListStyle,
      isNext,
      products
    })
  }
}
