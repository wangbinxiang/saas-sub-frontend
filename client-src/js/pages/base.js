if (module.hot) {
    module.hot.accept()
}

import 'foundation-sites'
$(document).foundation();

//$('#topBarSearch').click(function () {
//    if (!Foundation.MediaQuery.atLeast('medium')) {
//        $(this).toggleClass('even');
//        $('#topBarSearchInput').toggleClass('even');
//    }
//});

//$('#responsive-menu .top-bar-left--global').on('click', function () {
//    $('#responsive-menu').hide();
//});

//var lastScrollTop = 0;
//if (Foundation.MediaQuery.current == 'small') {
//    $(window).scroll(function (event) {
//        var st = $(this).scrollTop();
//        if (st > lastScrollTop && st > 60 && !$('#responsive-menu').is(':visible')) {
//            $('#headerGlobal').addClass('hidee');
//        } else {
//            $('#headerGlobal').removeClass('hidee');
//        }
//        lastScrollTop = st;
//    });
//}