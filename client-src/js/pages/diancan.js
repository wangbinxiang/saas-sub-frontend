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
  this.showSettlement = ko.observable(false)
  this.productTypeProducts = {}
  this.products = products || []

  const productTypeProducts = {}
  if (products) {
    for (let product of products) {
      if (!productTypeProducts[product.productTypeId]) {
        productTypeProducts[product.productTypeId] = []
      }
      productTypeProducts[product.productTypeId].push(product)
      // this.products[i] = ko.observableArray(products[i])
    }
  }

  if (productTypeProducts) {
    for (let i in productTypeProducts) {
      this.productTypeProducts[i] = ko.observableArray(productTypeProducts[i])
    }
  }

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
  this.addition = function (index, productTypeId, productIndex, data, event) {
    const product = lodash.clone(self.productTypeProducts[productTypeId]()[productIndex])
    data.count = lodash.isUndefined(data.count) ? 1 : ++data.count
    product.prices[index] = data
    self.updateCartProduct(productTypeId, productIndex, index, data.count)
    self.productTypeProducts[productTypeId].splice(productIndex, 1, product)
    // $('#dish-sticky-bar').addClass('top')
    // console.log(self.products[productTypeId]()[productIndex])
    // 增加产品数量
  }

  this.subtract = function (index, productTypeId, productIndex, data, event) {
    const product = lodash.clone(self.productTypeProducts[productTypeId]()[productIndex])
    data.count = data.count > 0 ? --data.count : 0
    self.updateCartProduct(productTypeId, productIndex, index, data.count)
    self.productTypeProducts[productTypeId].splice(productIndex, 1, product)
    // 减少产品数量
  }

  // 更新购物车内产品
  this.updateCartProduct = function (productTypeId, productIndex, priceIndex, count) {
    if (!self.cartProducts[productTypeId]) {
      self.cartProducts[productTypeId] = {}
    }
    if (!self.cartProducts[productTypeId][productIndex]) {
      self.cartProducts[productTypeId][productIndex] = {}
    }
    if (count > 0) {
      self.cartProducts[productTypeId][productIndex][priceIndex] = count
    } else {
      delete self.cartProducts[productTypeId][productIndex][priceIndex]
      if (lodash.isEmpty(self.cartProducts[productTypeId][productIndex])) {
        delete self.cartProducts[productTypeId][productIndex]
      }
      if (lodash.isEmpty(self.cartProducts[productTypeId])) {
        delete self.cartProducts[productTypeId]
      }
    }
    self.triggerShowSettlement()
    self.updateTotalPrice()
    if (lodash.isEmpty(self.cartProducts)) {
      self.toggleCart(false)
    }
  }


  this.triggerShowSettlement = function () {
    if (lodash.isEmpty(self.cartProducts)) {
        // 购物车没有商品，跳出
        this.showSettlement(false)
    } else {
        this.showSettlement(true)
    }
  }

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
      for (let productTypeId in self.cartProducts) {
        for (let productIndex in self.cartProducts[productTypeId]) {
          for (let priceKey in self.cartProducts[productTypeId][productIndex]) {
            totalPrice += self.productTypeProducts[productTypeId]()[productIndex].prices[priceKey].price * self.cartProducts[productTypeId][productIndex][priceKey]
          }
        }
      }
    }
    self.totalPrice(totalPrice)
  }

  this.settleAccounts = function () {
    let productsInfo = []
    if (!lodash.isEmpty(self.cartProducts)) {
      for (let productTypeId in self.cartProducts) {
        for (let productIndex in self.cartProducts[productTypeId] ) {
          const productInfo = {
            productId: self.productTypeProducts[productTypeId]()[productIndex].productId,
            source: self.productTypeProducts[productTypeId]()[productIndex].source,
            choicePrices: []
          }

          for (let priceIndex in self.cartProducts[productTypeId][productIndex]) {
            productInfo.choicePrices.push({
              index: priceIndex,
              number: self.cartProducts[productTypeId][productIndex][priceIndex]
            })
          }
          productsInfo.push(productInfo)
        }
      }
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

  $('#dishOrderB').on('click', '.add', function (e) {
    let obj = $(this)
    let q = parseInt(obj.prev().text()) + 1
    obj.prev().text(q).css('visibility', 'visible').prev().css('visibility', 'visible').parents('tr').addClass('selected')
    $('#finalOrder').addClass('show')
    $('#dish-sticky-bar').addClass('top')
  })

  $('#dishOrderB').on('click', '.subtract', function (e) {
    let obj = $(this)
    let q = parseInt(obj.next().text()) - 1
    obj.next().text(q)
    if (q === 0) {
      obj.css('visibility', 'hidden').next().text(q).css('visibility', 'hidden').parents('tr').removeClass('selected')
      $('#finalOrder').removeClass('show')
      $('#dish-sticky-bar').removeClass('top')
    }
  })

  let orderStatus = false
  $('#finalTotalB1').on('click', () => {
    if (!orderStatus) {
      if ($('#finalTotalB b').text !== '0') {
        $('.article-item--dish--b').each((i, e) => {
          if ($(e).find('tr.selected').length) {
            $(e).find('tr:not(".selected")').hide()
          } else {
            $(e).hide()
          }
        })
        $('#dish-sticky-bar').hide()
        $('#dish-label').hide()
        orderStatus = !orderStatus
        $('#finalOrder').addClass('detail')
      }
    } else {
      $('.article-item--dish--b').show()
      $('.article-item--dish--b tr').show()
      $('#dish-sticky-bar').show()
      $('#dish-label').show()
      orderStatus = !orderStatus
      $('#finalOrder').removeClass('detail')
    }
  })

  $('#dish-label').on('click', function () {
    $('#dish-label').toggleClass('show')
    $('#dish-sticky-bar').toggleClass('show')
  })

// $('#dish-sticky-bar').removeClass('show')

  $('.article-item--dish--b figure').on('click', function () {
    $(this).parents('.article-item--dish--b').toggleClass('detail')
  })

  $('#sticky-menu').on('update.zf.magellan', () => {
    $('#dish-label').text($('#sticky-menu a.active').text())
  })

  $('.dish-sticky-bar__link').on('click', () => {
    if (Foundation.MediaQuery.current === 'small') {
      $('#dish-label').trigger('click')
    }
  })
}

// $('.article-item--dish--b figure').on('click', function () {
//   $(this).parents('.article-item--dish--b').toggleClass('detail')
// })
