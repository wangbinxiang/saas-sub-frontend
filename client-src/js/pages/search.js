import {
  unescapeData
} from '../vendors/tools/string'
import './base.js'
if (module.hot) {
  module.hot.accept()
}

const ProductsModel = function (products, isnext, pageno, keyword) {
  const self = this
  unescapeData(products, 'name')
  this.products = ko.observableArray(products)
  this.isNext = ko.observable(isnext)
  this.keyword = ko.observable(keyword)

  this.more = () => {
    const keyword = $('#keyword').val()
    pageno++
    $.ajax({
      method: 'GET',
      url: '/search?keyword=' + keyword + '&number=' + pageno,
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
let productsModel = new ProductsModel(data, isnext, pageno, keyword)
ko.applyBindings(productsModel)
