
import 'foundation-sites'
if (module.hot) {
  module.hot.accept()
}

$(document).foundation()

$('#topBarSearch').click(function () {
  if (!Foundation.MediaQuery.atLeast('medium')) {
    $(this).toggleClass('even')
    $('#topBarSearchInput').toggleClass('even')
  }
})

$('#responsive-menu .top-bar-left--global').on('click', function () {
  $('#responsive-menu').hide()
})

$('#responsive-menu .top-bar-left--global').on('click', 'ul', function (e) {
  e.stopPropagation()
})

if (Foundation.MediaQuery.current === 'small') {
  $('#userShortcuts').on('show.zf.dropdown', () => {
    $('#userShortcuts').css('max-height', $(window).height() - 47)
  })
}

// const getNavbarWith = () => {
//   let navbarWidth = 0
//   $('#nav-menu li').each(function (i, e) {
//     navbarWidth += $(e).width() + 8
//   })
//   return navbarWidth + 16
// }

// if (Foundation.MediaQuery.current === 'small') {
//   let navbarWidth = getNavbarWith()
//   $('#nav-menu').css('width', navbarWidth)
//   $('#nav-menu-wrap').animate({ scrollLeft: navbarWidth }, 800, () => {
//     $('#nav-menu-wrap').animate({ scrollLeft: 0 }, 800)
//   })
// }

// export let closeTimer = null

// export function motionAlert(option) {
//     let html = `<div class="reveal reveal-motion callout alert fast ease-out" id="motionAlert" data-animate="slide-in-right slide-out-right">
//                     <h5></h5>
//                     <p></p>
//                     <div></div>
//                     <button class ="close-button" type="button" data-toggle="motionAlert">
//                         <span aria-hidden="true">&times;</span>
//                     </button>
//                 </div>`
//     if ($('#motionAlert').length === 0) {
//         $('body').append(html)
//         var elem = new Foundation.Toggler($('#motionAlert'));
//     }
//     $('#motionAlert h5').text(option.title)
//     if (option.note === null) {
//         $('#motionAlert p').hide()
//     } else {
//         $('#motionAlert p').text(option.note).show()
//     }
//     $('#motionAlert div').html(option.links)
//     if (option.status == 'success') {
//         $('#motionAlert').removeClass('alert').addClass('success')
//     } else {
//         $('#motionAlert').removeClass('success').addClass('alert')
//     }
//     $('#motionAlert [data-toggle="motionAlert"]').on('click', function(){
//         if (closeTimer != null) {
//             window.clearTimeout(closeTimer);
//             closeTimer = null;
//         }
//     })
//     Foundation.Motion.animateIn($('#motionAlert'), 'slide-in-right')
//     if (closeTimer != null) {
//         window.clearTimeout(closeTimer);
//         closeTimer = null;
//     }
//     closeTimer = setTimeout(() => {
//         Foundation.Motion.animateOut($('#motionAlert'), 'slide-out-right')
//         closeTimer = null
//     }, 3000)
// }

// HOW TO
// import {closeTimer, motionAlert} from './base.js'

// $('#testAlert').click(function(){
//    motionAlert({
//        //status: 'success',
//        title: 'dshjsdhd dsdsdsjdsds dsdsodsdsds',
//        note: "But when you're done reading it, click the close button in the corner to dismiss this alert.",
//        links: '<a class="button small" data-toggle="motionAlert">continue</a> <a class="button small">shopcart</a>'
//    })
// })
