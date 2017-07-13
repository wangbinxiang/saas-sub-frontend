import DeliveryInformationService from '../models/application/DeliveryInformationService'
import {
  showError
} from '../tools/error'
export async function index (ctx, next) {
  let number = ctx.query.number ? ctx.query.number : 1

  let size = ctx.query.size ? ctx.query.size : 10

  let filters = {
    userId: ctx._subId,
    status: 0
  }

  let pages = {
    number,
    size
  }

  const deliveryInformationService = new DeliveryInformationService()
  let page, deliveryInformations

  // let result = await deliveryInformationService.index('', filters, pages)
  let result = null
  let isNext = false

  if (result === null) {
    deliveryInformations = null
  } else {
    page = result.page
    deliveryInformations = result.deliveryInformations

    if (page && page.haveNext()) {
      isNext = true
    }
  }

  if (ctx.accepts('html', 'text', 'json') === 'json') {
    ctx.body = {
      deliveryInformations,
      isNext
    }
  } else {
    const title = '地址管理'
    const csrf = ctx.csrf
    const pageJs = webpackIsomorphicTools.assets().javascript.deliveryInformation

    await ctx.render('deliveryInformations/index', {
      title,
      pageJs,
      csrf,
      number,
      deliveryInformations,
      isNext
    })
  }
}

export async function add (ctx, next) {
// 当前店铺id
  let userId = ctx._subId

  let consignee = ctx.request.body.consignee
  let phone = ctx.request.body.phone
  let province = ctx.request.body.province
  let city = ctx.request.body.city
  let district = ctx.request.body.district
  let address = ctx.request.body.address
  let postalCode = ctx.request.body.postalCode

  const deliveryInformationService = new DeliveryInformationService()
  let { err, deliveryInformation } = await deliveryInformationService.add(userId, consignee, phone, province, city, district, address, postalCode)
  if (err) {
    showError(ctx, err)
  } else {
    ctx.body = deliveryInformation
  }
}

export async function edit (ctx, next) {
// 地址id
  const id = ctx.params.id

  let consignee = ctx.request.body.consignee
  let phone = ctx.request.body.phone
  let province = ctx.request.body.province
  let city = ctx.request.body.city
  let district = ctx.request.body.district
  let address = ctx.request.body.address
  let postalCode = ctx.request.body.postalCode

  const deliveryInformationService = new DeliveryInformationService()
  const deliveryInformation = await deliveryInformationService.edit(id, consignee, phone, province, city, district, address, postalCode)
  ctx.body = deliveryInformation
}

export async function del (ctx, next) {
  const id = ctx.params.id
  const deliveryInformationService = new DeliveryInformationService()
  const deliveryInformation = await deliveryInformationService.del(id)
  ctx.body = deliveryInformation
}
