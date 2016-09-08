if (module.hot) {
    module.hot.accept();
}
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

$('.jcarousel').not('.jcarousel--home').each(function (index, element) {
    $(element).jcarousel({
        wrap: 'circular'
    }).jcarouselAutoscroll({
        interval: 5000,
        target: '+=1',
        autostart: true
    }).swipe({
        allowPageScroll: 'vertical',
        //Generic swipe handler for all directions
        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
            event.stopPropagation();
            if (direction == 'left') {
                $(element).jcarousel('scroll', '+=1');
            }
            if (direction == 'right') {
                $(element).jcarousel('scroll', '-=1');
            }
        }
    }).next()
        .on('jcarouselcontrol:active', function () {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '-=1',
            carousel: $(element)
        }).next()
        .on('jcarouselcontrol:active', function () {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '+=1',
            carousel: $(element)
        });
})

$('#cartAlert .data-close').click(function () {
    $('#cartAlert').foundation('close');
})

$('#shopcartList .quantity').on('change', function () {
    cartTotal();
})
$('#shopcartList .quantity').on('keyup', function () {
    cartTotal();
})
function cartTotal() {
    var cartTotal = 0;
    $('#shopcartList tbody tr').each(function (i, ele) {
        var $this = $(ele);
        var price = $(ele).find('.cart-price').text();
        var total = $(ele).find('input').val();
        cartTotal += price * total;
    })
    $('#cartTotal').text(cartTotal);
}

//$('#shopcartList .modify').on('click', function () {
//    var obj = $('#shopcart tbody');
//    var pos = obj.position();
//    $('#shopcartMask').css({ 'height': obj.height(), 'top': pos.top }).show();
//})

$('#skuBar a').click(function() {
    if (!$(this).hasClass('checked')) {
        $(this).addClass('checked').siblings('.checked').removeClass('checked');
        $('#currentPrice').text($(this).attr('data-price'));
        $(this).attr('data-id');
        $(this).attr('data-price');
    }
})

$('#openCart').click(function() {
    var guestId = $('#guestId').val();
    var number = $('#number').val();
    if (guestId > 0) {
        var checked = false;
        $('.priceClick').map(function(){
            if($(this).hasClass('checked')) {
                var priceId = $(this).attr('data-id');
                var data = {
                    productId: $('#productId').val(),
                    number: number,
                    productPriceId: $(this).attr('data-id'),
                    guestId: guestId
                };
                checked = true;
                $.ajax({
                    url: '/addcart',
                    method: 'post',
                    data: data,
                    success: function(data) {
                        $('#cartAlert').foundation('open');
                    }
                });
            }
        })
        if (!checked) {
            alert('请选择价格！');
        };
    } else {
        alert('请登录！');
    }
});

//$('#listEqualizer').imagesLoaded(function(){
//  console.log($('#listEqualizer img:eq(1)').height());
//  //var options = {multiExpand: true, allowAllClosed: false};
//  var equalizer = new Foundation.Equalizer($('#listEqualizer'));
//  //$('#listEqualizer').foundation(); 
//  //Foundation.reInit($('#listEqualizer'));
//});