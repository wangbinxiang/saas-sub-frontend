import {
  PURCHASE_PRODUCT_STATUS_ON_SALE
} from '../../config/purchaseProductConf'
export default class PurchaseProduct {
  constructor ({
    id,
    name,
    category,
    feature,
    logo,
    minPrice,
    maxPrice,
    description,
    slides,
    prices,
    updateTime,
    createTime,
    statusTime,
    status,
    visible,
    userId,
    productTypeId,
    snapshots,
    distributionProduct,
    referenceProduct
  }) {
    this.id = id
    this.name = name
    this.category = category
    this.feature = feature
    this.logo = logo
    this.minPrice = minPrice
    this.maxPrice = maxPrice
    this.description = description
    this.slides = slides
    this.prices = prices
    this.updateTime = updateTime
    this.createTime = createTime
    this.statusTime = statusTime
    this.status = status
    this.visible = visible
    this.userId = userId
    this.productTypeId = productTypeId
    this.snapshotIds = snapshots
    this.distributionProduct = distributionProduct
    this.referenceProduct = referenceProduct
  }

  /**
   * 是否在出售
   * @author wangbinxiang
   * @date   2016-11-20T22:26:13+0800
   * @return {Boolean}                [description]
   */
  isOnSale () {
    if (this.status === PURCHASE_PRODUCT_STATUS_ON_SALE) {
      return true
    }
    return false
  }
}
