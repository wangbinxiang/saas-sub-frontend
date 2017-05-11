import config from 'config'
import _ from 'lodash'
import ShopService from '../models/application/ShopService'
import {
  isAuthRelationship
} from '../tools/auth'
import {
  decryptShopid
} from '../tools/host'
import {
  isPositiveInteger
} from '../tools/util'
/**
 * 验证子站id
 * @author wangbinxiang
 * @date   2016-09-21T16:57:29+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function handlerHostToSubId (ctx, next) {
  const hostMapping = config.get('hostMapping')

  let subId
  if (hostMapping && hostMapping[ctx.host]) {
    subId = hostMapping[ctx.host]
  } else {
    const hostSplit = ctx.host.split('.')
    try {
      subId = __DEVELOPMENT__ ? hostSplit[0] : decryptShopid(hostSplit[0])
    } catch (e) {
      ctx.status = 404
      await ctx.render('404')
    }
  }

  // const hostSplit = ctx.request.host.split('.');
  // let subId = hostSplit[0];
  // subId = "10002";
  // hostSplit[0] = '10';
  if (isPositiveInteger(subId)) {
    // 当前店铺id

    const shopService = new ShopService()
    let shop = await shopService.get(subId)
    if (shop.id === subId) {
      ctx._subId = subId
      ctx._shop = shop
      const imgHost = config.get('qiniu.bucket.subImg.url')
      let logo = '/img/sa_logo.png'
      let contactPeoplePhone = shop.contactPeoplePhone ? shop.contactPeoplePhone : ''
      let contactPeopleQQ = shop.contactPeopleQQ ? shop.contactPeopleQQ : ''
      let copyright = shop.contactPeopleQQ ? shop.copyright : '复泰科技电商湾'
      let officialQRCode = shop.officialQRCode ? shop.officialQRCode : ''
      let kefuId = shop.customerService && shop.customerService.kefuId > 0 ? shop.customerService.kefuId : null
      if (shop.logo) {
        // 七牛host
        logo = imgHost + shop.logo
        if (ctx._subId === '10021' && ctx.query.from == 'qd') {
          logo = 'http://sub-imgs.yundianshang.cc/10021-5c7831cc-a4a3-4c09-b211-37da33f304fa'
        }
      }
      if (contactPeopleQQ) {
        contactPeopleQQ = imgHost + contactPeopleQQ
      }
      if (officialQRCode) {
        officialQRCode = imgHost + officialQRCode
      }

      const themeConfig = config.get('theme')

      let theme = 'default'

      if (themeConfig) {
        if (themeConfig[ctx._subId]) {
          theme = themeConfig[ctx._subId]
        }
      }

      const relationship = isAuthRelationship(ctx)

      ctx.state.shopInfo = {
        id: shop.id,
        logo,
        contactPeoplePhone,
        contactPeopleQQ,
        copyright,
        officialQRCode,
        theme,
        kefuId,
        relationship
      }
      await next()
    } else {
      ctx.status = 404
      await ctx.render('404')
    }
  } else {
    ctx.status = 404
    await ctx.render('404')
  }
}
