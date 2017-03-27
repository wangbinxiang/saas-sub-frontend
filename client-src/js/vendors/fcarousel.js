import 'slick-carousel'

$('.slick-wrap.slick-fix640 .fcarousel').slick({
    dots:true,
    variableWidth: true,
    infinite: true,
    slidesToShow: 3,
    responsive: [
        {
            breakpoint: 640,
            settings: {
                variableWidth: false,
                infinite: true,
                slidesToShow:1
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
})

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