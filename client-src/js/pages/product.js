if (module.hot) {
    module.hot.accept()
}

import './base.js';

require.ensure([], function(require) {
    let jcarousel = require('jcarousel')

    $('.jcarousel').jcarousel({
        scroll: 1,
        //center:true
    })
    //    .swipe({
    //    allowPageScroll: 'vertical',
    //    //Generic swipe handler for all directions
    //    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
    //        event.stopPropagation();
    //        if (direction == 'left') {
    //            $(element).jcarousel('scroll', '+=1');
    //        }
    //        if (direction == 'right') {
    //            $(element).jcarousel('scroll', '-=1');
    //        }
    //    }
    //})
        .next()
        .on('jcarouselcontrol:active', function () {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '-=1',
            carousel: $('.jcarousel')
        }).next()
        .on('jcarouselcontrol:active', function () {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '+=1',
            carousel: $('.jcarousel')
        });
    
    $('#priceLabels a').on('click', function(){
        if(!$(this).hasClass('checked')){
            $(this).addClass('checked').siblings('.checked').removeClass('checked')
            $('#priceStat').text($(this).attr('data-price'))
        }
    })

    $('#orderNow').on('click', function(){
        let ref = 'id=' + id + '&price=' + $('#priceLabels a.checked').index() + '&number=' + $('#orderNumber').val()
        location.href = '/orders/add?' + ref
    })
})

let GoodsModel = function(goods) {
    var arrGoods = $.map(goods, function(value, index) {
        return [value];
    });
    let self = this
    self.goods = ko.observableArray(arrGoods)
    self.isNext = ko.observable(isnext)
    
    self.more = () => {
        pageno = pageno + 1
        $.ajax({
            method: "GET",
            url: "/products?number=" + pageno,
            dataType: "json"
        })
        .done(function(respones) {
            var goods = $.map(respones.products, function(value, index) {
                return [value];
            });
            for(let good of goods){
                self.goods.push(good)
            }
            self.isNext(respones.isNext)
        })
    }
};

let PricesModel = function(prices) {
    //var arrGoods = $.map(goods, function(value, index) {
    //    return [value];
    //});
    let self = this
    self.prices = ko.observableArray(prices)
    
    self.edit = function(price) {
        $('#skuTitle').val(price.title)
        $('#skuPrice').val(price.price)
        $('#skuIdx').val(self.prices.indexOf(price))
        $('#pricePanel').foundation('open');
    }

    self.remove = (price) => {
        self.prices.remove(price)
    }

    self.update = () => {
        $.ajax({
            method: "POST",
            url: "/products/" + goodId + "/prices",
            data: {prices:self.prices()}
        })
        .done(function(respones) {
            alert('价格保存成功！');
            location.href = '/products/';
        })
    }
};

$(function(){
    if($('#productPrices').length){
        let pricesModel = new PricesModel(data)
        ko.applyBindings(pricesModel, document.getElementById('productPrices'))

        $('#addPrice').on('click', function(){
            $('#skuTitle, #skuPrice').val("")
            $('#skuIdx').val("")
            $('#pricePanel').foundation('open');
        })

        $('#savePrice').click(function(){
            if($('#skuTitle').val() != "" && $('#skuPrice').val() != ""){
                let idx = $('#skuIdx').val()                
                var price = {title: $('#skuTitle').val(), price:$('#skuPrice').val()}
                if(idx == ""){
                    pricesModel.prices.push(price)
                } else {
                    pricesModel.prices.splice(idx, 1, price)
                }
                $('#pricePanel').foundation('close');
           }
        })
    }
    // history.pushState({}, "page 2", "bar.html");
    
    if($('#productsIndex').length){
        let goodsModel = new GoodsModel(data)
        ko.applyBindings(goodsModel, document.getElementById('productsIndex'))
    }
})
