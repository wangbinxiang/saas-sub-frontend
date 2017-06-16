import './base.js'

const ConfirmModel = function (data) {
  let self = this
  // self.goods = ko.observableArray(data.goods)
  // self.addresses = ko.observableArray(data.addresses)

  self.save = function () {
    $('#formOrderConfirm').foundation('validateForm')
    if ($('[data-invalid]').length === 0) {
      $('#confirmButton').attr('disabled', true)
      $.ajax({
        method: 'POST',
        url: '/orders',
        dataType: 'json',
        data: {
          price: price,
          comment: $('#comment').val(),
          productId: prodId,
          number: productNum,
          priceIndex: priceOrder,
          source: source
        }
      })
        .done(function (respones) {
          window.alert('下单成功。')
          window.location.href = '/orders/jumpPay?id=' + respones.id + '&payType=' + $("input[name='payType']:checked").val()
        })
        .fail(function (respones) {
          window.alert('下单失败。')
          $('#confirmButton').attr('disabled', false)
        })
    }
    return false
  }
}

if ($('#orderConfirm').length) {
  let confirmModel = new ConfirmModel()
  ko.applyBindings(confirmModel, document.getElementById('orderConfirm'))
}

const ConfirmMulitModel = function (cartTable, productsInfo) {
  this.cartTable = cartTable
  this.productsInfo = productsInfo

  // self.goods = ko.observableArray(data.goods)
  // self.addresses = ko.observableArray(data.addresses)

  this.save = function () {
    $('#confirmButton').attr('disabled', true)
    $.ajax({
      method: 'POST',
      url: '/orders',
      data: {
        cartTableId: this.cartTable.id,
        productsInfo: JSON.stringify(this.productsInfo),
        comment: $('#comment').val()
      }
    })
    .done(function (respones) {
      window.location.href = '/orders/jumpPay?id=' + respones.id + '&payType=1'
    })
    .fail(function (respones) {
      window.alert('下单失败。')
      $('#confirmButton').attr('disabled', false)
    })
    return false
  }
}
if ($('#orderMulitConfirm').length) {
  let confirmMulitModel = new ConfirmMulitModel(cartTable, productsInfo)
  ko.applyBindings(confirmMulitModel, document.getElementById('orderMulitConfirm'))
}

let OrderModel = function (data) {
  let self = this
  self.goods = ko.observableArray(data.goods)
  self.addresses = ko.observableArray(data.addresses)
}

if ($('#orderDetail').length) {
  let orderModel = new OrderModel(order)
  ko.applyBindings(orderModel, document.getElementById('orderDetail'))
}

let OrdersModel = function (orders) {
  let self = this
  self.orders = ko.observableArray(orders)
  self.isNext = ko.observable(isNext)

  self.more = function () {
    pageNo += 1
    $.ajax({
      method: 'GET',
      url: '/orders?number=' + pageNo,
      dataType: 'json'
    })
      .done(function (respones) {
        if (respones.orders) {
          for (let order of respones.orders) {
            self.orders.push(order)
          }
        }
        self.isNext(respones.isNext)
      })
      .fail(function (response) {

      })
  }
}
if ($('#ordersWrap').length) {
  let ordersModel = new OrdersModel(data)
  ko.applyBindings(ordersModel, document.getElementById('ordersWrap'))
}

const PayTypeModel = function (payType) {
  const self = this
  this.comment = ko.observable()
  this.payType = ko.observable(null)
  this.showOffline = ko.observable(false)
  this.showPayButton = ko.observable(false)
  this.payType.subscribe((newValue) => {
    switch (newValue) {
      case '1':
      case '3':
        this.showOffline(false)
        this.showPayButton(true)
        break
      case '2':
        this.showOffline(true)
        this.showPayButton(false)
        break
    }
  })
  this.payType(payType)

  this.offlineButtonText = ko.observable('提交转账信息')
  this.offlineButtonDisable = ko.observable(false)
  this.offlineButtonClick = function () {
    Foundation.reInit($('#formOrderPayOffline'))
    $('#formOrderPayOffline').foundation('validateForm')

    if ($('[data-invalid]').length === 0) {
      self.offlineButtonDisable(true)
      self.offlineButtonText('正在提交转账信息,请稍后.')

      const comment = self.comment()

      $.ajax({
        method: 'PUT',
        url: '/orders/' + orderId + '/offline-pay',
        dataType: 'json',
        data: {
          comment
        }
      })
        .done(function (response) {
          alert('提交成功')
          location.reload()
        })
        .fail(function (response) {
          alert('提交失败，请稍后再试。')
          self.offlineButtonDisable(false)
          self.offlineButtonText('提交转账信息')
        })
    } else {
      $('html, body').animate({
        scrollTop: $('.is-invalid-label, is-invalid-input').eq(0).offset().top
      })
    }
  }

  this.payButtonDisable = ko.observable(false)
  this.payButtonClick = function () {
    self.payButtonDisable(true)
    const payType = self.payType()
    let url = ''
    if (payType === '1') {
      url = 'http://' + hubHost + '/wechat/pay/?id=' + orderId
    } else if (payType === '3') {
      url = '/orders/' + orderId + '/third-pay'
    }
    location.href = url
  }
}
if ($('#payTypeDiv').length) {
  const payTypeModel = new PayTypeModel(payType)
  ko.applyBindings(payTypeModel, document.getElementById('payTypeDiv'))
}

// 第三方支付
$('#thirdPay').click(function () {
  $('#thirdPay').attr('disabled', true)
  $.ajax({
    method: 'PUT',
    url: '/orders/' + orderId + '/third-pay'
  })
    .done(function (respones) {
      alert('支付成功。')
      location.href = '/orders/' + orderId
    })
    .fail(function (respones) {
      alert('支付失败。')
      $('#thirdPay').attr('disabled', false)
    })
})
