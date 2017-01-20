if (module.hot) {
    module.hot.accept()
}

import './base.js'

let ConfirmModel = function(data){
    let self = this;
    // self.goods = ko.observableArray(data.goods)
    // self.addresses = ko.observableArray(data.addresses)

    self.save = function(){


        // console.log($("input[name='payType']:checked").val())
        // return

        $('#formOrderConfirm').foundation('validateForm');
        if($('[data-invalid]').length === 0){
            $('#confirmButton').attr('disabled', true);
            $.ajax({
                method: "POST",
                url: "/orders",
                data: { price: price, comment: $('#comment').val(), productId: prodId, number: productNum, priceIndex: priceOrder }
            })
            .done(function(respones) {
                alert('下单成功。');
                location.href = '/orders/jumpPay?id=' + respones.id;
            })
            .fail(function(respones){
                alert('下单失败。');
                $('#confirmButton').attr('disabled', false);
            })
        }
        return false
    }
}

if($('#orderConfirm').length){
    let confirmModel = new ConfirmModel();
    ko.applyBindings(confirmModel, document.getElementById('orderConfirm'))
}

let OrderModel = function(data){
    let self = this;
    self.goods = ko.observableArray(data.goods)
    self.addresses = ko.observableArray(data.addresses)
}

if($('#orderDetail').length){
    let orderModel = new OrderModel(order) 
    ko.applyBindings(orderModel, document.getElementById('orderDetail'))
}

let OrderssModel = function(data){
    let self = this;
    self.orders = ko.observableArray(data.orders)

    let moreOrders = [
        {"id": 123, status: 1, "total": 12556, "dateOrder": "2016-06-25 12:25", "datePay": "-"},
        {"id": 124, status: 2, "total": 125, "dateOrder": "2016-05-25 12:25", "datePay": "2016-05-25 12:25"},
        {"id": 125, status: 3, "total": 9, "dateOrder": "2016-04-25 12:25", "datePay": "2016-04-25 12:25"}
    ]

    self.more = function(){
        for (let order of moreOrders){
            self.orders.push(order)
        }
    }
}

if($('#listOrders').length){
    let ordersModel = new OrderssModel(orders) 
    ko.applyBindings(ordersModel, document.getElementById('listOrders'))
}

let OrdersModel = function(orders){
    let self = this
    self.orders = ko.observableArray(orders)
    self.isNext = ko.observable(isNext)

    self.more = function(){
        pageNo += 1
        $.ajax({
            method: "GET",
            url: "/orders?number=" + pageNo,
            dataType: "json"
        })
        .done(function(respones) {
            if (respones.orders) {
                for(let order of respones.orders){
                    self.orders.push(order)
                }
            }
            self.isNext(respones.isNext);
        })
        .fail(function(response){
            
            
        })
    }
}
if($('#ordersWrap').length){
    let orderModel = new OrdersModel(data);
    ko.applyBindings(orderModel, document.getElementById('ordersWrap'));
}

//第三方支付
$('#thirdPay').click(function(){
    $('#thirdPay').attr('disabled', true);
    $.ajax({
        method: "PUT",
        url: "/orders/" + orderId + '/third-pay'
    })
    .done(function(respones) {
        alert('支付成功。');
        location.href = '/orders/' + orderId;
    })
    .fail(function(respones){
        alert('支付失败。');
        $('#thirdPay').attr('disabled', false);
    })
})