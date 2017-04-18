if (module.hot) {
    module.hot.accept()
}

import './base.js'
import lodash from 'lodash'
import { unescapeData } from '../vendors/tools/string'


const DiancanModel = function (products = [{
    id: 1,
    name: "红烧牛腩饭",
    feature: "红烧牛腩是四川省传统的特色名菜，属于川菜系。主要食材是牛腩。卤汁乳白稠浓，肉质肥嫩，滋味鲜美。营养价值较高，一般人都适合食用。",
    logo: "http://ww4.sinaimg.cn/bmiddle/81f4d57ely1feq1smlatmj20qo0qo45s.jpg",
    prices: [{
        name: '测试1号',
        price: 20
    }, {
        name: '测试2号',
        price: 30
    }, {
        name: '测试3号',
        price: 40
    }]
},{
    id: 2,
    name: "红烧牛腩饭",
    feature: "红烧牛腩是四川省传统的特色名菜，属于川菜系。主要食材是牛腩。卤汁乳白稠浓，肉质肥嫩，滋味鲜美。营养价值较高，一般人都适合食用。",
    logo: "http://ww4.sinaimg.cn/bmiddle/81f4d57ely1feq1smlatmj20qo0qo45s.jpg",
    prices: [{
        name: '测试1号',
        price: 50
    }, {
        name: '测试2号',
        price: 10
    }, {
        name: '测试3号',
        price: 44
    }]
}], isNext, pageNumber) {
    const self = this
    this.isNext = ko.observable(isNext)
    this.cartProducts = {}
    this.toggleCart = ko.observable(false)

    this.products = ko.observableArray(products ? products : []);

    this.more = function() {
        pageNumber++
        $.ajax({
            method: "GET",
            url: "/?number=" + pageNumber,
            dataType: "json"
        })
        .done(function(respones) {
            const products = respones.products
            unescapeData(products, 'name')
            for(let product of products){
                self.products.push(product)
            }     

            self.isNext(respones.isNext);       
        })
    }



    this.addition = function (index, parentIndex, data, event) {
        const product = lodash.clone(self.products()[parentIndex])
        data.count = lodash.isUndefined(data.count)? 1: ++data.count
        product.prices[index] = data
        self.updateCartProduct(parentIndex, index, data.count)
        self.products.splice(parentIndex, 1, product)
        //增加产品数量
    }

    this.subtract = function (index, parentIndex, data, event) {
        const product = lodash.clone(self.products()[parentIndex])
        data.count = data.count > 0? --data.count: 0
        self.updateCartProduct(parentIndex, index, data.count)
        self.products.splice(parentIndex, 1, product)
        //减少产品数量
    }

    //更新购物车内产品
    this.updateCartProduct = function(productIndex, priceIndex, count) {
        if(!self.cartProducts[productIndex]) {
            self.cartProducts[productIndex] = {}
        }
        if(count > 0) {
            self.cartProducts[productIndex][priceIndex] = count
        } else {
            delete self.cartProducts[productIndex][priceIndex]
            if(lodash.isEmpty(self.cartProducts[productIndex])) {
                delete self.cartProducts[productIndex]
            }
        }
        self.updateTotalPrice(self.cartProducts)
    }

    let orderStatus = false
    //显示已选商品
    this.toggleCartProduct = function() {

        const toggleCart = !self.toggleCart()

        //显示清单
        if(toggleCart) {
            if(lodash.isEmpty(self.cartProducts)){
                //购物车没有商品，跳出
                return
            }
        } else {
            //显示全部
        }

        self.toggleCart(toggleCart)
    }

    this.updateTotalPrice = function() {
        let totalPrice = 0
        if(!lodash.isEmpty(self.cartProducts)) {
            for(let key in self.cartProducts) {
                for(let priceKey in self.cartProducts[key]) {
                    totalPrice += self.products()[key].prices[priceKey].price * self.cartProducts[key][priceKey]
                }
            }
        }
        self.totalPrice(totalPrice)
    }

    this.settleAccounts = function() {

    }

    this.totalPrice = ko.observable(0)
}
if ($('#diancan').length) {
    let diancanModel = new DiancanModel(products, isNext, pageNumber);
    ko.applyBindings(diancanModel, document.getElementById('diancan'));
}

$('.article-item--dish--b figure').on('click', function() {
    $(this).parents('.article-item--dish--b').toggleClass('detail')
})