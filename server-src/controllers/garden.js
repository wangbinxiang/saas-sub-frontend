import ChannelService from '../models/application/ChannelService'
import config from 'config'
import {
  slideStyle,
  listStyle
} from '../tools/imgStyle'

export async function articles (ctx, next) {
  const pageJs = webpackIsomorphicTools.assets().javascript.index

  const imgHost = config.get('qiniu.bucket.subImg.url')

  const channelService = new ChannelService()
  const info = await channelService.gardenArticles(ctx._subId)
  // const categories = {}
  // for (let i of info.categories){
  //     categories.[i.id], i.name])
  // }
  const title = info.channelName + ' - ' + ctx._shop.title

  const imgSlideStyle = slideStyle(ctx)

  const imgListStyle = listStyle(ctx)

  await ctx.render('garden/articles', {
    title,
    pageJs,
    info,
    imgHost,
    imgSlideStyle,
    imgListStyle
  })
}

export async function products (ctx, next) {
  const pageJs = webpackIsomorphicTools.assets().javascript.index

  const imgHost = config.get('qiniu.bucket.subImg.url')

  const id = ctx.params.id ? ctx.params.id : 0

  const channelService = new ChannelService()
  const info = await channelService.gardenProducts(ctx._subId, id, ctx.memberGroup)

  const title = info.channelName + ' - ' + ctx._shop.title

  const imgSlideStyle = slideStyle(ctx)
  const imgListStyle = listStyle(ctx)

  await ctx.render('garden/products', {
    title,
    pageJs,
    info,
    imgHost,
    imgListStyle,
    imgSlideStyle
  })
}

export async function projects (ctx, next) {
  const pageJs = webpackIsomorphicTools.assets().javascript.index

  const imgHost = config.get('qiniu.bucket.subImg.url')

  const id = ctx.params.id ? ctx.params.id : 0

  const channelService = new ChannelService()
  const info = await channelService.gardenProjects(ctx._subId, id, ctx.memberGroup)

  const title = info.channelInfo.name + ' - ' + ctx._shop.title

  const imgListStyle = listStyle(ctx)

  await ctx.render('garden/projects', {
    title,
    pageJs,
    info,
    imgHost,
    imgListStyle
  })
}
