import {
  unescapeData
} from '../vendors/tools/string'
import './base.js'

if (module.hot) {
  module.hot.accept()
}

const ProductsModel = function (products, isnext, pageno) {
  const self = this
  unescapeData(products, 'name')
  this.products = ko.observableArray(products)
  this.isNext = ko.observable(isnext)

  this.more = () => {
    pageno++
    $.ajax({
      method: 'GET',
      url: '/search?number=' + pageno,
      dataType: 'json'
    })
      .done(function (respones) {
        var products = respones.products
        unescapeData(products, 'name')
        for (let product of products) {
          self.products.push(product)
        }
        self.isNext(respones.isNext)
      })
  }
}
let productsModel = new ProductsModel(data, isnext, pageno)
ko.applyBindings(productsModel)
