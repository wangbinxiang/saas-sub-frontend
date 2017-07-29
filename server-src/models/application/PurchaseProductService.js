import PurchaseProductAdapter from '../adapter/PurchaseProductAdapter'
import PurchaseProduct from '../model/PurchaseProduct'

export default class PurchaseProductService {
  constructor () {
    this.purchaseProductAdapter = new PurchaseProductAdapter()
  }

  async get (idList) {
    const include = ['referenceProduct']
    const purchases = await this.purchaseProductAdapter.get({
      idList: idList,
      include
    }, PurchaseProduct)
    if (purchases === null) {
      return null
    } else {
      return purchases
    }
  }
}
