if (module.hot) {
    module.hot.accept()
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


//import {closeTimer, motionAlert} from '../vendors/motion-alert.js'

//$('#testAlert').click(function(){
//    motionAlert({
//        //status: 'success',
//        title: 'dshjsdhd dsdsdsjdsds dsdsodsdsds',
//        note: "But when you're done reading it, click the close button in the corner to dismiss this alert.",
//        links: '<a class="button small" data-toggle="motionAlert">continue</a> <a class="button small">shopcart</a>'
//    })
//})