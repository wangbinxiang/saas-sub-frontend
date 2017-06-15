export default class ProductProxy {
  constructor ({
    id,
    source,
    productId,
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
    productTypeId
  }) {
    this.id = id
    this.source = source
    this.productId = productId
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
  }
}
