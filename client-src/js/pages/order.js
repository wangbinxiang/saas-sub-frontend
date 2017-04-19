if (module.hot) {
    module.hot.accept()
}

import './base.js'

const ConfirmModel = function(data){
    let self = this;
    // self.goods = ko.observableArray(data.goods)
    // self.addresses = ko.observableArray(data.addresses)

    self.save = function(){
        $('#formOrderConfirm').foundation('validateForm');
        if($('[data-invalid]').length === 0){
            $('#confirmButton').attr('disabled', true);
            $.ajax({
                method: "POST",
                url: "/orders",
                dataType: "json",
                data: { price: price, comment: $('#comment').val(), productId: prodId, number: productNum, priceIndex: priceOrder }
            })
            .done(function(respones) {
                alert('下单成功。');
                location.href = '/orders/jumpPay?id=' + respones.id + '&payType=' + $("input[name='payType']:checked").val();
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

const ConfirmMulitModel = function(productsInfo){
    // self.goods = ko.observableArray(data.goods)
    // self.addresses = ko.observableArray(data.addresses)

    this.save = function(){
        $('#confirmButton').attr('disabled', true);
        $.ajax({
            method: "POST",
            url: "/orders",
            data: { productsInfo: JSON.stringify(productsInfo), comment: $('#comment').val() }
        })
        .done(function(respones) {
            alert('下单成功。');
            location.href = '/orders/jumpPay?id=' + respones.id + '&payType=1';
        })
        .fail(function(respones){
            alert('下单失败。');
            $('#confirmButton').attr('disabled', false);
        })
        return false
    }
}
if($('#orderMulitConfirm').length){
    let confirmMulitModel = new ConfirmMulitModel(productsInfo);
    ko.applyBindings(confirmMulitModel, document.getElementById('orderMulitConfirm'))
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

let OrderssModel = function(orders){
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
    let orderModel = new OrderssModel(data);
    ko.applyBindings(orderModel, document.getElementById('ordersWrap'));
}

const PayTypeModel = function(payType) {
    const self = this
    this.comment = ko.observable()
    this.payType = ko.observable(null)
    this.showOffline = ko.observable(false)
    this.showPayButton = ko.observable(false)
    this.payType.subscribe((newValue) => {
        switch(newValue) {
            case '1':
            case '3':
                this.showOffline(false)
                this.showPayButton(true)
               break; 
            case '2':
                this.showOffline(true)
                this.showPayButton(false)
                break;
        }
    })  
    this.payType(payType) 

    this.offlineButtonText = ko.observable('提交转账信息')
    this.offlineButtonDisable = ko.observable(false)
    this.offlineButtonClick = function() {
        Foundation.reInit($('#formOrderPayOffline'));
        $('#formOrderPayOffline').foundation('validateForm');

        if($('[data-invalid]').length === 0){
            self.offlineButtonDisable(true)
            self.offlineButtonText('正在提交转账信息,请稍后.')

            const comment = self.comment()

            $.ajax({
                method: 'PUT',
                url: '/orders/' + orderId + '/offline-pay' ,
                dataType: "json",
                data: { comment }
            })
            .done(function(response) {
                alert('提交成功');
                location.reload();
            })
            .fail(function(response){
                alert('提交失败，请稍后再试。');
                self.offlineButtonDisable(false)
                self.offlineButtonText('提交转账信息')
            })

        } else {
            $("html, body").animate({ scrollTop: $('.is-invalid-label, is-invalid-input').eq(0).offset().top });
        }
    }

    this.payButtonDisable = ko.observable(false)
    this.payButtonClick = function() {
        self.payButtonDisable(true)
        const payType = self.payType()
        let url = '';
        if (payType === '1') {
            url = 'http://' + hubHost + '/wechat/pay/?id=' + orderId
        } else if(payType === '3') {
            url = '/orders/' + orderId + '/third-pay'
        }
        location.href = url
    }
}
if($('#payTypeDiv').length){
    const payTypeModel = new PayTypeModel(payType);
    ko.applyBindings(payTypeModel, document.getElementById('payTypeDiv'));
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