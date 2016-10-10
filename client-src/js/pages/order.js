if (module.hot) {
    module.hot.accept()
}

import '../../../client-src/js/pages/base.js'

let ConfirmModel = function(data){
    let self = this;
    self.goods = ko.observableArray(data.goods)
    self.addresses = ko.observableArray(data.addresses)

    self.save = function(){
        $('#formOrderConfirm').foundation('validateForm');
        if($('[data-invalid]').length === 0){
            $.ajax({
                method: "POST",
                url: "/orders",
                data: { price: price, comment: $('#comment').val(), productList: [{productId: prodId, number: productNum, priceIndex: priceOrder}] }
            })
            .done(function(respones) {
                alert('success')
            })
            .fail(function(respones){
                
            })
        }
        return false
    }
}

if($('#orderConfirm').length){
    let confirmModel = new ConfirmModel(data)
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

let OrdersModel = function(data){
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
    let ordersModel = new OrdersModel(orders) 
    ko.applyBindings(ordersModel, document.getElementById('listOrders'))
}