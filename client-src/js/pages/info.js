import './base.js'

//  设置重定向

const redirectUrl = $('#redirect').attr('href') || '/'
let time = 2
// setTimeout(function () {
//   window.location.href = redirectUrl
// }, 2000)

setInterval(function () {
  $('#time').text(time)
  time--
  if (time === 0) {
    window.location.href = redirectUrl
  }
}, 1000)
