if (module.hot) {
    module.hot.accept()
}

import '../../../client-src/js/pages/base.js'

$('#tagFilter li a').click(function() {
    $(this).parent().toggleClass('active')
})

require.ensure([], function(require) {
    //let Masonry = require('masonry-layout')
    //Foundation.onImagesLoaded($('#masonryWrap img'), function () {
    //    new Masonry($('#masonryWrap'), {
    //        // options
    //        itemSelector: '.column',
    //        percentPosition: true
    //    })
    //})

    let imagesLoaded = require('imagesloaded')
    new imagesLoaded($('#listEqualizer'), function(){
        var equalizer = new Foundation.Equalizer($('#listEqualizer'));
    });
})