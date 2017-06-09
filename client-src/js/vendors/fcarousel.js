import 'slick-carousel'

let slickBugFix = () => {
    let bWidth = $(window).width()
    if (bWidth > 640) {
        $('.slick-wrap.slick-fix640 .slick-track').css('left', (0 - Math.ceil((bWidth - 640) / 2)))
    }
}

$('.slick-wrap.slick-fix640 .fcarousel').slick({
    dots: true,
    variableWidth: true,
    infinite: true,
    slidesToShow: 1,
    centerMode: true,
    responsive: [
        {
            breakpoint: 640,
            settings: {
                variableWidth: false,
                infinite: true,
                slidesToShow: 1,
                centerMode: false
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
})

if ($('.slick-wrap.slick-fix640 .fcarousel').length) {
    let htmlClone = $('.slick-wrap.slick-fix640 .fcarousel__item[data-slick-index="2"]').clone()
    $('.slick-wrap.slick-fix640 .slick-track').append(htmlClone)
    slickBugFix();
    $(window).resize(slickBugFix);
}

$('.slick-wrap.slick-full .fcarousel').slick({
    dots:true,
    infinite: true,
    slidesToShow: 1
})

$('.slick-wrap.slick-center .fcarousel').slick({
    dots:true,
    centerMode: true,
    centerPadding: '100px',
    slidesToShow: 1,
    infinite: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                centerMode: false,
                slidesToShow:1
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
})

$('.good-carousel').slick({
    centerMode: true,
    slidesToShow: 1,
    variableWidth: true,
    //lazyLoad:'progressive'
})