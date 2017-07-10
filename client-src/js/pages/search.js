import {
  unescapeDataCurryRight
} from '../vendors/tools/string'
import './base.js'
if (module.hot) {
  module.hot.accept()
}

const unescapeDataNameFeature = unescapeDataCurryRight(['name', 'feature'])

const ProductsModel = function (products, isnext, pageno, keyword) {
  const self = this
  unescapeDataNameFeature(products)
  this.products = ko.observableArray(products)
  this.isNext = ko.observable(isnext)
  this.keyword = ko.observable(keyword)

  this.more = () => {
    self.isNext(false)
    const keyword = $('#keyword').val()
    pageno++
    $.ajax({
      method: 'GET',
      url: '/search?keyword=' + keyword + '&number=' + pageno,
      dataType: 'json'
    })
      .done(function (respones) {
        var products = respones.products
        unescapeDataNameFeature(products)
        for (let product of products) {
          self.products.push(product)
        }
        self.isNext(respones.isNext)
      })
  }
}
let productsModel = new ProductsModel(data, isnext, pageno, keyword)
ko.applyBindings(productsModel)
