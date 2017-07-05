import 'foundation-sites'
if (module.hot) {
  module.hot.accept()
}
$(document).foundation()

if ($('#responsive-menu-toggler').length) {
  const toggleMenu = function () {
    $('#nav-menu-wrap').toggleClass('show')
    if (!$('#nav-menu-wrap').hasClass('show')) {
      setTimeout(() => {
        $('#nav-menu-wrap').css('left', '-100%')
      }, 500)
    } else {
      $('#nav-menu-wrap').css('left', 0)
    }
  }

  $('#responsive-menu .top-bar-left--global').on('click', function () {
    if (Foundation.MediaQuery.current === 'small') {
      toggleMenu()
    }
  })

  $('#responsive-menu-toggler').on('click', () => {
    if (Foundation.MediaQuery.current === 'small') {
      toggleMenu()
    }
  })

  $('#userShortcuts').on('show.zf.dropdown', () => {
    if (Foundation.MediaQuery.current === 'small') {
      $('#userShortcuts').css('max-height', $(window).height() - 47)
    }
  })
} else {
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
}

if (Foundation.MediaQuery.current === 'small') {
  $('#userShortcuts').on('show.zf.dropdown', () => {
    $('#userShortcuts').css('max-height', $(window).height() - 47)
  })
}

var lastScrollTop = 0
//  手机版向下滚动时，header自动隐藏
$(window).scroll(function (event) {
  if (Foundation.MediaQuery.current === 'small') {
    var st = $(this).scrollTop()
    if (st > lastScrollTop && st > 60 && !$('#nav-menu-wrap').hasClass('show')) {
      $('#headerGlobal').addClass('hidee')
    } else {
      $('#headerGlobal').removeClass('hidee')
    }
    lastScrollTop = st
  }
})

// 头部搜索框
$('#topBarSearch').click(search)
$('#topBarSearchInput').keypress(function (e) {
  if (e.keyCode === 13) {
    search()
  }
})
function search () {
  const keyword = $('#topBarSearchInput').val()

  if (keyword !== '') {
    const rediret = '/search?keyword=' + keyword

    window.location.href = rediret
  }
}
