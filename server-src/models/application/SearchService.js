import ProductProxyAdapter from '../adapter/ProductProxyAdapter'
import ProductProxy from '../model/ProductProxy'

export default class ProductProxyService {
  constructor () {
    this.productProxyAdapter = new ProductProxyAdapter()
  }

  async index (userId, number, size, keyword) {
    const filters = {
      userId: userId,
      name: keyword,
      status: 2
    }
    const pages = {
      number,
      size
    }
    const sort = '-id'
    const include = [
      'product',
      'product.referenceProduct',
      'product.distributionProduct'
    ]

    const fields = {
      'commonProducts': 'id,name,logo,feature,minPrice,maxPrice,status,visible'
    }
    let result = await this.productProxyAdapter.get({
      filters,
      pages,
      sort,
      include,
      fields
    }, ProductProxy)

    if (result === null) {
      // 没有获取数据 直接返回空
      return null
    } else {
      let {
        page,
        result: products
      } = result
      // 返回 分页 和 Products 数据
      return {
        page,
        products
      }
    }
  }
}
