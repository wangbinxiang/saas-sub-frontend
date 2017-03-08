if (module.hot) {
    module.hot.accept()
}

import './base.js';
import jQueryBridget from 'jquery-bridget'
import Masonry from 'masonry-layout'

jQueryBridget( 'masonry', Masonry, $ );



require.ensure([], function(require) {
    let jcarousel = require('jcarousel')
    let swipe = require('jquery-touchswipe')

    $('.jcarousel.jcarousel--home ul').css('width', 100 * $('.jcarousel.jcarousel--home ul li').length + '%');
    $('.jcarousel.jcarousel--home ul li').css('width', 100 / $('.jcarousel.jcarousel--home ul li').length + '%').css('visibility', 'visible');

    $('.jcarousel.jcarousel--home').jcarousel({        
        wrap: 'circular'
    }).jcarouselAutoscroll({
        interval: 7500,
        target: '+=1',
        autostart: true
    })
    .swipe({
        allowPageScroll: 'vertical',
        excludedElements : '.noSwipe',
        //Generic swipe handler for all directions
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            //event.stopPropagation();
            if (direction == 'left') {
                $('.jcarousel.jcarousel--home').jcarousel('scroll', '+=1');
            }
            if (direction == 'right') {
                $('.jcarousel.jcarousel--home').jcarousel('scroll', '-=1');
            }
        }
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
    // var arrData = $.map(data, function(value, index) {
    //     return [value];
    // });
    
    let self = this
    self.prods = ko.observableArray(data);
    self.isNext = ko.observable(isNext);

    self.more = function() {
       pageno = pageno + 1
       $.ajax({
           method: "GET",
           url: "/?number=" + pageno,
           dataType: "json"
       })
       .done(function(respones) {
           // const products = $.map(respones.products, function(value, index) {
           //     return [value];
           // });
           for(let product of respones.products){
               self.prods.push(product)
           }
           self.isNext(respones.isNext);
           Foundation.reInit($('#listEqualizer'));
       })
    }
}

if($('.orbit--garden').length === 0 && $('.top-carousel--nopadding').length === 0){
    let prodModel = new ProdModel(data)
    ko.applyBindings(prodModel)

    if(prodModel.prods().length > 1){
        require.ensure([], function(require) {
            let imagesLoaded = require('imagesloaded')
            new imagesLoaded($('#listEqualizer'), function(){
                var equalizer = new Foundation.Equalizer($('#listEqualizer'));
            });
        })
    }
}

if($('#masonryWrap').length){
    Foundation.onImagesLoaded($('#masonryWrap img'), function () {
        $('#masonryWrap').masonry({
            // options
            itemSelector: '.column',
            percentPosition: true
        });
    });
}