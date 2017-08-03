import ArticlesService from '../models/application/ArticlesService'
import nl2br from 'nl2br'
import config from 'config'
import {
  detailStyle
} from '../tools/imgStyle'
import {
  PERMISSION_CATEGORY_DETAIL_SHOW
} from '../config/memberGroupConf'
import {
  verifyPermission
} from '../tools/permission'

export async function detail (ctx, next) {
  // 文章id
  const id = ctx.params.id
  const articlesService = new ArticlesService()
  const article = await articlesService.detail(id, ctx._subId)
  if (article === null) {
    await next()
  } else {
    const pagePermission = verifyPermission(ctx.memberGroup, PERMISSION_CATEGORY_DETAIL_SHOW
, article.categoryId)

    const title = article.title + ' - ' + ctx._shop.title

    const pageJs = webpackIsomorphicTools.assets().javascript.article

    const imgHost = config.get('qiniu.bucket.subImg.url')

    const imgDetailStyle = detailStyle(ctx)

    await ctx.render('articles/detail', {
      title,
      article,
      pageJs,
      nl2br,
      imgHost,
      imgDetailStyle,
      pagePermission
    })
  }
}
