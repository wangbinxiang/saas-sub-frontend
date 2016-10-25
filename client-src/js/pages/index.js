if (module.hot) {
    module.hot.accept()
}

import '../../../client-src/js/pages/base.js';

require.ensure([], function(require) {
    let jcarousel = require('jcarousel')

    $('.jcarousel.jcarousel--home ul').css('width', 100 * $('.jcarousel.jcarousel--home ul li').length + '%');
    $('.jcarousel.jcarousel--home ul li').css('width', 100 / $('.jcarousel.jcarousel--home ul li').length + '%');

    $('.jcarousel.jcarousel--home').jcarousel({        
        wrap: 'circular'
    }).jcarouselAutoscroll({
        interval: 15000,
        target: '+=1',
        autostart: true
    })
    //.swipe({
    //    allowPageScroll: 'vertical',
    //    excludedElements : '.noSwipe',
    //    //Generic swipe handler for all directions
    //    //swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
    //    //    //event.stopPropagation();
    //    //    if (direction == 'left') {
    //    //        $('.jcarousel.jcarousel--home').jcarousel('scroll', '+=1');
    //    //    }
    //    //    if (direction == 'right') {
    //    //        $('.jcarousel.jcarousel--home').jcarousel('scroll', '-=1');
    //    //    }
    //    //}
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
            }).next()
            .on('jcarouselcontrol:active', function () {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function () {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1',            
            }).next()
            .on('jcarouselpagination:active', 'a', function () {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function () {
                $(this).removeClass('active');
            })
            .jcarouselPagination({
                item: function (page, carouselItems) {
                    return '<a href="#' + page + '">' + page + '</a>';
                }
            });
})

let ProdModel = function(data){
    var arrData = $.map(data, function(value, index) {
        return [value];
    });
    
    let self = this
    self.prods = ko.observableArray(arrData)
    console.log(self.prods())

    //self.more = function() {
    //    pageno = pageno + 1
    //    $.ajax({
    //        method: "GET",
    //        url: "/product-types?number=" + pageno,
    //        dataType: "json"
    //    })
    //    .done(function(respones) {
    //        let types = $.map(respones.productTypes, function(value, index) {
    //            return [value];
    //        });
    //        for(let type of types){
    //            self.types.push(type)
    //        }
    //        self.isNext(respones.moreInfo)
    //    })
    //}
}

let prodModel = new ProdModel(data)
ko.applyBindings(prodModel)

require.ensure([], function(require) {
    let imagesLoaded = require('imagesloaded')
    new imagesLoaded($('#listEqualizer'), function(){
        var equalizer = new Foundation.Equalizer($('#listEqualizer'));
    });
})