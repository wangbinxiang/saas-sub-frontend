if (module.hot) {
    module.hot.accept()
}

import 'foundation-sites'
$(document).foundation();

$('#topBarSearch').click(function () {
    if (!Foundation.MediaQuery.atLeast('medium')) {
        $(this).toggleClass('even');
        $('#topBarSearchInput').toggleClass('even');
    }
});

$('#responsive-menu .top-bar-left--global').on('click', function () {
    $('#responsive-menu').hide();
});

$('#responsive-menu .top-bar-left--global').on('click', 'ul', function (e) {
    e.stopPropagation();
});

var lastScrollTop = 0;
if (Foundation.MediaQuery.current == 'small') {
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop && st > 60 && !$('#responsive-menu').is(':visible')) {
            $('#headerGlobal').addClass('hidee');
        } else {
            $('#headerGlobal').removeClass('hidee');
        }
        lastScrollTop = st;
    });
}

export let closeTimer = null

export function motionAlert(option) {    
    let html = `<div class="reveal reveal-motion callout alert fast ease-out" id="motionAlert" data-animate="slide-in-right slide-out-right">
                    <h5></h5>
                    <p></p>
                    <div></div>
                    <button class ="close-button" type="button" data-toggle="motionAlert">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
    if ($('#motionAlert').length === 0) {
        $('body').append(html)
        var elem = new Foundation.Toggler($('#motionAlert'));
    }
    $('#motionAlert h5').text(option.title)
    if (option.note === null) {
        $('#motionAlert p').hide()
    } else {
        $('#motionAlert p').text(option.note).show()
    }
    $('#motionAlert div').html(option.links)
    if (option.status == 'success') {
        $('#motionAlert').removeClass('alert').addClass('success')
    } else {
        $('#motionAlert').removeClass('success').addClass('alert')
    }
    $('#motionAlert [data-toggle="motionAlert"]').on('click', function(){
        console.log('shiver')
        if (closeTimer != null) {
            window.clearTimeout(closeTimer);
            closeTimer = null;
        }
    })
    Foundation.Motion.animateIn($('#motionAlert'), 'slide-in-right')
    if (closeTimer != null) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
    }
    closeTimer = setTimeout(() => {
        Foundation.Motion.animateOut($('#motionAlert'), 'slide-out-right')
        closeTimer = null
    }, 3000)
}

//HOW TO
//import {closeTimer, motionAlert} from './base.js'

//$('#testAlert').click(function(){
//    motionAlert({
//        //status: 'success',
//        title: 'dshjsdhd dsdsdsjdsds dsdsodsdsds',
//        note: "But when you're done reading it, click the close button in the corner to dismiss this alert.",
//        links: '<a class="button small" data-toggle="motionAlert">continue</a> <a class="button small">shopcart</a>'
//    })
//})