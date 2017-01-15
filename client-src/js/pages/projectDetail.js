if (module.hot) {
    module.hot.accept()
}

import './base.js'

let jcarousel = require('jcarousel')

$('.jcarousel').jcarousel({
    scroll: 1,
})
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


$('#submit').on('click', function(){
    let ref = 'projectId=' + id + '&priceIndex=' + $('#priceLabels a.checked').index()

    location.href = '/applications/add?' + ref
})

