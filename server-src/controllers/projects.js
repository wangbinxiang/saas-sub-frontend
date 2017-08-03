import ProjectService from '../models/application/ProjectService'
import {
  PROJECT_CATEGORY_B2C
} from '../config/projectConf'
import nl2br from 'nl2br'
import config from 'config'
import {
  detailSlideStyle,
  detailStyle
} from '../tools/imgStyle'
import {
  verifyPermission
} from '../tools/permission'
import {
  PERMISSION_PROJECT_TYPE_DETAIL_SHOW,
  PERMISSION_PROJECT_TYPE_TRADE
} from '../config/memberGroupConf'

export async function detail (ctx, next) {
  const id = ctx.params.id
  const projectService = new ProjectService()
  const project = await projectService.detail(id, ctx._subId, PROJECT_CATEGORY_B2C)
  if (project === null) {
    await next()
  } else {
    // ctx.memberGroup.purview = { [PERMISSION_PROJECT_TYPE_DETAIL_SHOW]: [project.projectType] }

    const pagePermission = verifyPermission(ctx.memberGroup, PERMISSION_PROJECT_TYPE_DETAIL_SHOW, project.projectType)

    ctx.body = project
    let template = 'detail'
    if (project.slides.length === 0) {
      template = 'detailEmptySlides'
    }

    const imgDetailSlideStyle = detailSlideStyle(ctx)
    const imgDetailStyle = detailStyle(ctx)

    const title = project.name + ' - ' + ctx._shop.title

    const pageJs = webpackIsomorphicTools.assets().javascript.projectDetail

    const imgHost = config.get('qiniu.bucket.subImg.url')

    // ctx.memberGroup.purview = { [PERMISSION_PROJECT_TYPE_TRADE]: [project.projectType] }

      // 交易权限
    let tradePermission = null
    if (pagePermission) {
      tradePermission = verifyPermission(ctx.memberGroup, PERMISSION_PROJECT_TYPE_TRADE, project.projectType)
    }

    await ctx.render('projects/' + template, {
      title,
      project,
      pageJs,
      nl2br,
      imgHost,
      imgDetailSlideStyle,
      imgDetailStyle,
      pagePermission,
      tradePermission
    })
  }
}
