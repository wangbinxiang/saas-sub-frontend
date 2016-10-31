if (module.hot) {
    module.hot.accept()
}

import './base.js'

let ConfirmModel = function(data){
    let self = this;
    // self.goods = ko.observableArray(data.goods)
    // self.addresses = ko.observableArray(data.addresses)

    self.save = function(){
        $('#formOrderConfirm').foundation('validateForm');
        if($('[data-invalid]').length === 0){
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
    self.isnext = isNext

    self.more = function(){
        $('#moreOrders').attr('disabled', true)
        pageNo += 1
        $.ajax({
            method: "POST",
            url: "/orders/" + pageNo,
        })
        .done(function(respones) {
            self.orders.push(respones.orders)
            self.isnext = respones.isNext
        })
        .fail(function(response){
            //alert('商品ID不存在!')
            let data = [
                {id:2233232, status:'等待支付', payment:'微信支付', total:233232, userid:15023568974},
                {id:2233232, status:'等待支付', payment:'微信支付', total:233232, userid:15023568974},
                {id:2233232, status:'等待支付', payment:'微信支付', total:233232, userid:15023568974}
            ]
            for(let i of data){
                self.orders.push(i)
            }
            $('#moreOrders').attr('disabled', false)
        })
    }
}
if($('#ordersWrap').length){
    let orderModel = new OrdersModel(data);
    ko.applyBindings(orderModel, document.getElementById('ordersWrap'));
}