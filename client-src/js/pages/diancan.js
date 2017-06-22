import './base.js'
import lodash from 'lodash'
import {
  unescapeData
} from '../vendors/tools/string'
import '../vendors/jquery.extend/form'
import {
  addQuery
} from '../vendors/tools/url'

const DiancanModel = function (cartTable, products, productTypes, isNext, pageNumber) {
  const self = this
  this.cartTable = cartTable
  this.isNext = ko.observable(isNext)
  this.cartProducts = {}
  this.toggleCart = ko.observable(false)

  this.products = ko.observableArray(products || [])
  this.productTypes = ko.observableArray(productTypes || [])
  this.more = function () {
    pageNumber++
    $.ajax({
      method: 'GET',
      url: addQuery(window.location.href, {
        number: pageNumber
      }),
      dataType: 'json'
    })
      .done(function (respones) {
        const products = respones.products
        unescapeData(products, 'name')
        for (let product of products) {
          self.products.push(product)
        }

        self.isNext(respones.isNext)
      })
  }
  this.addition = function (index, parentIndex, data, event) {
    const product = lodash.clone(self.products()[parentIndex])
    data.count = lodash.isUndefined(data.count) ? 1 : ++data.count
    product.prices[index] = data
    self.updateCartProduct(parentIndex, index, data.count)
    self.products.splice(parentIndex, 1, product)
    // 增加产品数量
  }

  this.subtract = function (index, parentIndex, data, event) {
    const product = lodash.clone(self.products()[parentIndex])
    data.count = data.count > 0 ? --data.count : 0
    self.updateCartProduct(parentIndex, index, data.count)
    self.products.splice(parentIndex, 1, product)
    // 减少产品数量
  }

  // 更新购物车内产品
  this.updateCartProduct = function (productIndex, priceIndex, count) {
    if (!self.cartProducts[productIndex]) {
      self.cartProducts[productIndex] = {}
    }
    if (count > 0) {
      self.cartProducts[productIndex][priceIndex] = count
    } else {
      delete self.cartProducts[productIndex][priceIndex]
      if (lodash.isEmpty(self.cartProducts[productIndex])) {
        delete self.cartProducts[productIndex]
      }
    }
    self.updateTotalPrice(self.cartProducts)
    if (lodash.isEmpty(self.cartProducts)) {
      self.toggleCart(false)
    }
  }

  let orderStatus = false
  // 显示已选商品
  this.toggleCartProduct = function () {
    const toggleCart = !self.toggleCart()

    // 显示清单
    if (toggleCart) {
      if (lodash.isEmpty(self.cartProducts)) {
        // 购物车没有商品，跳出
        return
      }
    } else {
      // 显示全部
    }

    self.toggleCart(toggleCart)
  }

  this.updateTotalPrice = function () {
    let totalPrice = 0
    if (!lodash.isEmpty(self.cartProducts)) {
      for (let key in self.cartProducts) {
        for (let priceKey in self.cartProducts[key]) {
          totalPrice += self.products()[key].prices[priceKey].price * self.cartProducts[key][priceKey]
        }
      }
    }
    self.totalPrice(totalPrice)
  }

  this.settleAccounts = function () {
    let productsInfo = []
    if (!lodash.isEmpty(self.cartProducts)) {
      for (let index in self.cartProducts) {
        // productsInfo[self.products()[index].id] = {
        //   productId: self.products()[index].productId,
        //   soure: self.products()[index].source,
        //   choicePrice: []
        // }

        const productInfo = {
          productId: self.products()[index].productId,
          source: self.products()[index].source,
          choicePrices: []
        }

        for (let priceIndex in self.cartProducts[index]) {
          productInfo.choicePrices.push({
            index: priceIndex,
            number: self.cartProducts[index][priceIndex]
          })
        }
        productsInfo.push(productInfo)
      }
      // return
      $.form('/orders/add', {
        productsInfo: JSON.stringify(productsInfo),
        cartTableId: cartTable.id
      }).submit()
    }
  }

  this.totalPrice = ko.observable(0)
}
if ($('#diancan').length) {
  let diancanModel = new DiancanModel(cartTable, products, productTypes, isNext, pageNumber)
  ko.applyBindings(diancanModel, document.getElementById('diancan'))
}

$('.article-item--dish--b figure').on('click', function () {
  $(this).parents('.article-item--dish--b').toggleClass('detail')
})
