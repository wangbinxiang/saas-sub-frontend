if (module.hot) {
    module.hot.accept()
}

import './base.js'


const DiancanModel = function (products = [{
    id: 1,
    prices: [{
        name: '测试1号',
        price: 200
    }, {
        name: '测试2号',
        price: 300
    }, {
        name: '测试3号',
        price: 400
    }]
}]) {
    console.log(products)
    this.products = ko.observableArray(products ? products : []);
    this.addition = function (index, data, event) {
        console.log(index)
        console.log(data)
        console.log(event)
    }
}
if ($('#diancan').length) {
    let diancanModel = new DiancanModel();
    ko.applyBindings(diancanModel, document.getElementById('diancan'));
}

// $('#dishOrderB').on('click', '.add', function(e) {
//     let obj = $(this)
//     let q = parseInt(obj.prev().text()) + 1
//     obj.prev().text(q).show().prev().show().parents('tr').addClass('selected')
// })

// $('#dishOrderB').on('click', '.subtract', function(e) {
//     let obj = $(this)
//     let q = parseInt(obj.next().text()) - 1
//     obj.next().text(q)
//     if(q === 0){
//         obj.hide().next().text(q).hide().parents('tr').removeClass('selected')
//     }
// })

// let orderStatus = false
// $('#finalTotalB').on('click', () => {
//     if(!orderStatus){
//         if($('#finalTotalB b').text !== '0'){
//             $('.article-item--dish--b').each((i, e) => {
//                 if($(e).find('tr.selected').length){
//                     $(e).find('tr:not(".selected")').hide()
//                 } else {
//                     $(e).hide()
//                 }
//             })
//             orderStatus = !orderStatus
//             $('#finalOrder').addClass('detail')
//         }
//     } else {
//         $('.article-item--dish--b').show()
//         $('.article-item--dish--b tr').show()
//         orderStatus = !orderStatus
//         $('#finalOrder').removeClass('detail')
//     }
// })

// $('.article-item--dish--b figure').on('click', function() {
//     $(this).parents('.article-item--dish--b').toggleClass('detail')
// })